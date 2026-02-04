create table if not exists public.local_runtime_status (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  status text not null default 'offline' check (status in ('online','offline','error')),
  version text,
  last_seen timestamptz default now(),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create index if not exists local_runtime_status_last_seen_idx
  on public.local_runtime_status(last_seen desc);

create table if not exists public.local_runtime_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  level text not null default 'info' check (level in ('debug','info','warn','error')),
  message text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists local_runtime_logs_workspace_created_idx
  on public.local_runtime_logs(workspace_id, created_at desc);

alter table public.local_runtime_status enable row level security;
alter table public.local_runtime_logs enable row level security;

drop policy if exists "workspace members can read runtime status" on public.local_runtime_status;
drop policy if exists "workspace members can upsert runtime status" on public.local_runtime_status;

create policy "workspace members can read runtime status"
  on public.local_runtime_status for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can upsert runtime status"
  on public.local_runtime_status for insert
  with check (public.is_workspace_member(workspace_id));

create policy "workspace members can update runtime status"
  on public.local_runtime_status for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

drop policy if exists "workspace members can read runtime logs" on public.local_runtime_logs;
drop policy if exists "workspace members can insert runtime logs" on public.local_runtime_logs;

create policy "workspace members can read runtime logs"
  on public.local_runtime_logs for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can insert runtime logs"
  on public.local_runtime_logs for insert
  with check (public.is_workspace_member(workspace_id));