create table if not exists public.connector_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  connector_id uuid references public.connectors(id) on delete set null,
  character_id uuid references public.characters(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists connector_events_workspace_created_idx
  on public.connector_events(workspace_id, created_at desc);

create index if not exists connector_events_connector_created_idx
  on public.connector_events(connector_id, created_at desc);

alter table public.connector_events enable row level security;

drop policy if exists "workspace members can read connector events" on public.connector_events;
drop policy if exists "workspace members can insert connector events" on public.connector_events;
drop policy if exists "workspace members can delete connector events" on public.connector_events;

create policy "workspace members can read connector events"
  on public.connector_events for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can insert connector events"
  on public.connector_events for insert
  with check (public.is_workspace_member(workspace_id));

create policy "workspace members can delete connector events"
  on public.connector_events for delete
  using (public.is_workspace_member(workspace_id));