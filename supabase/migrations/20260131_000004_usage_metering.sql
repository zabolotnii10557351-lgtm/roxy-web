-- Task 5/9: Usage metering + Active Speech quota ledger + plan limit enforcement primitives

create extension if not exists "pgcrypto";

-- Workspace billing state (no LemonSqueezy, local state only)
create table if not exists public.billing_state (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  plan_id text not null default 'starter',
  trial_end timestamptz null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists set_updated_at_billing_state on public.billing_state;
create trigger set_updated_at_billing_state
before update on public.billing_state
for each row execute procedure public.set_updated_at();

alter table public.billing_state enable row level security;

drop policy if exists "workspace members can read billing_state" on public.billing_state;
drop policy if exists "workspace members can upsert billing_state" on public.billing_state;

create policy "workspace members can read billing_state"
  on public.billing_state
  for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can upsert billing_state"
  on public.billing_state
  for insert
  with check (public.is_workspace_member(workspace_id));

-- Billing periods (monthly calendar windows)
create table if not exists public.billing_periods (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  period_start timestamptz not null,
  period_end timestamptz not null,
  created_at timestamptz default now()
);

create unique index if not exists billing_periods_workspace_start_unique
  on public.billing_periods (workspace_id, period_start);

alter table public.billing_periods enable row level security;

drop policy if exists "workspace members can read billing_periods" on public.billing_periods;
create policy "workspace members can read billing_periods"
  on public.billing_periods
  for select
  using (public.is_workspace_member(workspace_id));

-- Usage events
create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid null,
  provider text not null,
  model text null,
  type text not null,
  amount numeric not null,
  unit text not null,
  is_billable boolean not null default true,
  created_at timestamptz default now()
);

create index if not exists usage_events_workspace_created_at_idx
  on public.usage_events (workspace_id, created_at desc);

create index if not exists usage_events_workspace_type_created_at_idx
  on public.usage_events (workspace_id, type, created_at desc);

alter table public.usage_events enable row level security;

drop policy if exists "workspace members can read usage_events" on public.usage_events;
drop policy if exists "workspace members can insert usage_events" on public.usage_events;

create policy "workspace members can read usage_events"
  on public.usage_events
  for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can insert usage_events"
  on public.usage_events
  for insert
  with check (
    auth.uid() = user_id
    and public.is_workspace_member(workspace_id)
  );

-- Quota ledger (service-only reads/writes; UI reads through server routes)
create table if not exists public.quota_ledger (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  period_start timestamptz not null,
  period_end timestamptz not null,
  quota_type text not null,
  included_seconds numeric not null default 0,
  purchased_seconds numeric not null default 0,
  used_seconds numeric not null default 0,
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  unique (workspace_id, period_start, quota_type)
);

drop trigger if exists set_updated_at_quota_ledger on public.quota_ledger;
create trigger set_updated_at_quota_ledger
before update on public.quota_ledger
for each row execute procedure public.set_updated_at();

alter table public.quota_ledger enable row level security;

-- Optional add-on credits structure (no checkout here)
create table if not exists public.add_on_credits (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  credit_type text not null,
  amount_seconds numeric not null,
  source text not null default 'manual',
  created_at timestamptz default now()
);

create index if not exists add_on_credits_workspace_created_at_idx
  on public.add_on_credits (workspace_id, created_at desc);

alter table public.add_on_credits enable row level security;

drop policy if exists "workspace members can read add_on_credits" on public.add_on_credits;
create policy "workspace members can read add_on_credits"
  on public.add_on_credits
  for select
  using (public.is_workspace_member(workspace_id));

-- Atomic quota consume (service role)
create or replace function public.consume_openai_active_speech(
  p_workspace_id uuid,
  p_period_start timestamptz,
  p_quota_type text,
  p_seconds numeric
)
returns table(
  used_seconds numeric,
  remaining_seconds numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_included numeric;
  v_purchased numeric;
  v_used numeric;
  v_total numeric;
  v_remaining numeric;
begin
  if p_seconds is null or p_seconds <= 0 then
    raise exception 'seconds must be > 0';
  end if;

  select q.included_seconds, q.purchased_seconds, q.used_seconds
    into v_included, v_purchased, v_used
  from public.quota_ledger q
  where q.workspace_id = p_workspace_id
    and q.period_start = p_period_start
    and q.quota_type = p_quota_type
  for update;

  if not found then
    raise exception 'quota_ledger row missing';
  end if;

  v_total := coalesce(v_included, 0) + coalesce(v_purchased, 0);
  v_remaining := v_total - coalesce(v_used, 0);

  if v_remaining < p_seconds then
    raise exception 'QUOTA_EXCEEDED';
  end if;

  update public.quota_ledger
  set used_seconds = used_seconds + p_seconds
  where workspace_id = p_workspace_id
    and period_start = p_period_start
    and quota_type = p_quota_type;

  select q.used_seconds, (coalesce(q.included_seconds,0) + coalesce(q.purchased_seconds,0) - coalesce(q.used_seconds,0))
    into used_seconds, remaining_seconds
  from public.quota_ledger q
  where q.workspace_id = p_workspace_id
    and q.period_start = p_period_start
    and q.quota_type = p_quota_type;

  return;
end;
$$;

-- Allow service role to execute
grant execute on function public.consume_openai_active_speech(uuid, timestamptz, text, numeric) to service_role;
