-- Task 3/9: CRUD-ready columns + deploy sessions + public share RPC

create extension if not exists "pgcrypto";

-- Ensure characters has published flag
alter table public.characters
  add column if not exists published boolean not null default false;

-- Ensure connectors has status + created_at
alter table public.connectors
  add column if not exists status text not null default 'connected',
  add column if not exists created_at timestamptz default now();

alter table public.connectors
  drop constraint if exists connectors_status_check;

alter table public.connectors
  add constraint connectors_status_check
  check (status in ('connected','disconnected','error'));

-- Ensure created_at exists on other tables
alter table public.dono_rules
  add column if not exists created_at timestamptz default now();

alter table public.stream_scripts
  add column if not exists created_at timestamptz default now();

alter table public.scenes
  add column if not exists created_at timestamptz default now();

-- Deploy sessions
create table if not exists public.deploy_sessions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  token text not null unique,
  status text not null default 'ready' check (status in ('ready','stopped','error')),
  character_id uuid references public.characters(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.deploy_sessions enable row level security;

drop policy if exists "workspace members can read deploy_sessions" on public.deploy_sessions;
drop policy if exists "workspace members can insert deploy_sessions" on public.deploy_sessions;
drop policy if exists "workspace members can update deploy_sessions" on public.deploy_sessions;
drop policy if exists "workspace members can delete deploy_sessions" on public.deploy_sessions;

create policy "workspace members can read deploy_sessions"
  on public.deploy_sessions for select
  using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert deploy_sessions"
  on public.deploy_sessions for insert
  with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update deploy_sessions"
  on public.deploy_sessions for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete deploy_sessions"
  on public.deploy_sessions for delete
  using (public.is_workspace_member(workspace_id));

-- Public RPC to fetch SAFE share info (no workspace_id exposure)
create or replace function public.get_share_session(p_token text)
returns table (
  token text,
  status text,
  created_at timestamptz,
  character_display_name text
)
language sql
security definer
stable
as $$
  select
    ds.token,
    ds.status,
    ds.created_at,
    coalesce(
      nullif((c.config->'profile'->>'displayName')::text, ''),
      c.name,
      'Character'
    ) as character_display_name
  from public.deploy_sessions ds
  left join public.characters c
    on c.id = ds.character_id
  where ds.token = p_token
  limit 1;
$$;

grant execute on function public.get_share_session(text) to anon;
grant execute on function public.get_share_session(text) to authenticated;
