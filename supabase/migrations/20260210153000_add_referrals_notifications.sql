-- Task 10/9: Referrals + notifications

create extension if not exists "pgcrypto";

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  owner_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists promo_codes_code_unique
  on public.promo_codes (lower(code));

drop trigger if exists set_updated_at_promo_codes on public.promo_codes;
create trigger set_updated_at_promo_codes
before update on public.promo_codes
for each row execute procedure public.set_updated_at();

alter table public.promo_codes enable row level security;

drop policy if exists "promo_codes owner read" on public.promo_codes;
drop policy if exists "promo_codes owner insert" on public.promo_codes;
drop policy if exists "promo_codes owner update" on public.promo_codes;

create policy "promo_codes owner read"
  on public.promo_codes
  for select
  using (owner_user_id = auth.uid());

create policy "promo_codes owner insert"
  on public.promo_codes
  for insert
  with check (owner_user_id = auth.uid());

create policy "promo_codes owner update"
  on public.promo_codes
  for update
  using (owner_user_id = auth.uid());

create table if not exists public.referral_signups (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.promo_codes(id) on delete cascade,
  referred_user_id uuid not null references auth.users(id) on delete cascade,
  referred_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_at timestamptz default now(),
  unique (code_id, referred_user_id)
);

alter table public.referral_signups enable row level security;

drop policy if exists "referral_signups read own" on public.referral_signups;
create policy "referral_signups read own"
  on public.referral_signups
  for select
  using (
    referred_user_id = auth.uid()
    or exists (
      select 1
      from public.promo_codes pc
      where pc.id = referral_signups.code_id
        and pc.owner_user_id = auth.uid()
    )
  );

create table if not exists public.referral_redemptions (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.promo_codes(id) on delete cascade,
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  referrer_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  referred_user_id uuid not null references auth.users(id) on delete cascade,
  referred_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  plan_id text not null,
  is_qualifying boolean not null default false,
  bonus_seconds numeric not null default 0,
  source text not null default 'stripe',
  external_event_id text not null,
  claimed_at timestamptz null,
  claimed_by_user_id uuid null references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  unique (external_event_id)
);

create index if not exists referral_redemptions_code_created_idx
  on public.referral_redemptions (code_id, created_at desc);

alter table public.referral_redemptions enable row level security;

drop policy if exists "referral_redemptions read own" on public.referral_redemptions;
create policy "referral_redemptions read own"
  on public.referral_redemptions
  for select
  using (
    referred_user_id = auth.uid()
    or referrer_user_id = auth.uid()
  );

create table if not exists public.referral_claims (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.promo_codes(id) on delete cascade,
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  referrer_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  claimed_count int not null,
  bonus_seconds numeric not null,
  created_at timestamptz default now()
);

alter table public.referral_claims enable row level security;

drop policy if exists "referral_claims read own" on public.referral_claims;
create policy "referral_claims read own"
  on public.referral_claims
  for select
  using (referrer_user_id = auth.uid());

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  type text not null,
  title text not null,
  body text null,
  data jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz default now()
);

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists "notifications read own" on public.notifications;
drop policy if exists "notifications update own" on public.notifications;

create policy "notifications read own"
  on public.notifications
  for select
  using (user_id = auth.uid());

create policy "notifications update own"
  on public.notifications
  for update
  using (user_id = auth.uid());

-- Extend auth signup handler to capture referral codes
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_display_name text;
  v_username text;
  v_workspace_id uuid;
  v_workspace_name text;
  v_username_taken boolean;
  v_has_settings boolean;
  v_ref_code text;
  v_code_id uuid;
begin
  v_display_name := coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), 'User');
  v_username := nullif(new.raw_user_meta_data->>'username', '');

  if v_username is not null then
    select exists(
      select 1 from public.profiles p
      where p.username = v_username
    ) into v_username_taken;

    if v_username_taken then
      v_username := null;
    end if;
  end if;

  insert into public.profiles (
    id,
    email,
    display_name,
    username,
    plan,
    plan_id,
    status,
    trial_ends_at,
    entitlements
  )
  values (
    new.id,
    new.email,
    v_display_name,
    v_username,
    'trial',
    'trial',
    'trialing',
    now() + interval '7 days',
    jsonb_build_object(
      'flags', jsonb_build_object(
        'export_import', false,
        'watermark_toggle', false,
        'auto_language', false,
        'advanced_scripts', false,
        'unreal_connector', false
      ),
      'limits', jsonb_build_object(
        'tiktok_accounts', 1,
        'dono_rules', 10,
        'scripts', 2,
        'knowledge_items', 0,
        'logs_days', 3
      )
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = excluded.display_name,
        username = coalesce(public.profiles.username, excluded.username);

  select exists(
    select 1 from public.user_settings us where us.user_id = new.id
  ) into v_has_settings;

  if not v_has_settings then
    if v_display_name is null or v_display_name = 'User' then
      v_workspace_name := 'My workspace';
    else
      v_workspace_name := v_display_name || ' workspace';
    end if;

    insert into public.workspaces (name, owner_user_id)
    values (v_workspace_name, new.id)
    returning id into v_workspace_id;

    insert into public.workspace_members (workspace_id, user_id, role)
    values (v_workspace_id, new.id, 'owner')
    on conflict do nothing;

    insert into public.user_settings (user_id, default_workspace_id)
    values (new.id, v_workspace_id)
    on conflict (user_id) do nothing;
  end if;

  v_ref_code := nullif(new.raw_user_meta_data->>'referral_code', '');
  if v_ref_code is not null and v_workspace_id is not null then
    select pc.id
      into v_code_id
    from public.promo_codes pc
    where lower(pc.code) = lower(v_ref_code)
      and pc.is_active = true
    limit 1;

    if v_code_id is not null then
      insert into public.referral_signups (code_id, referred_user_id, referred_workspace_id)
      values (v_code_id, new.id, v_workspace_id)
      on conflict do nothing;
    end if;
  end if;

  return new;
end;
$$ language plpgsql security definer;
