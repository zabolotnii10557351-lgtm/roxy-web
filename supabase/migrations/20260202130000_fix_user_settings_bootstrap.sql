-- Fix production 500s from user_settings RLS/type mismatches and
-- provide a safe self-healing bootstrap for default workspace creation.

-- Ensure table exists (in case previous migration wasn't applied).
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  default_workspace_id uuid references public.workspaces(id),
  default_language text default 'en',
  talk_ratio numeric default 0.20,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- If user_settings.user_id was created as text/varchar in an earlier deploy,
-- policies like (auth.uid() = user_id) can throw and surface as PostgREST 500.
do $$
declare
  v_udt_name text;
  v_pk_name text;
  v_fk record;
begin
  select c.udt_name
    into v_udt_name
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = 'user_settings'
    and c.column_name = 'user_id';

  if v_udt_name is null then
    return;
  end if;

  if v_udt_name <> 'uuid' then
    -- Drop PK (name may vary) and all FKs on this table to allow type change.
    select conname
      into v_pk_name
    from pg_constraint
    where conrelid = 'public.user_settings'::regclass
      and contype = 'p'
    limit 1;

    if v_pk_name is not null then
      execute format('alter table public.user_settings drop constraint %I', v_pk_name);
    end if;

    for v_fk in
      select conname
      from pg_constraint
      where conrelid = 'public.user_settings'::regclass
        and contype = 'f'
    loop
      execute format('alter table public.user_settings drop constraint %I', v_fk.conname);
    end loop;

    -- Convert user_id to uuid (expects auth user ids).
    execute 'alter table public.user_settings alter column user_id type uuid using user_id::uuid';

    -- Re-add constraints with stable names.
    begin
      execute 'alter table public.user_settings add constraint user_settings_pkey primary key (user_id)';
    exception
      when duplicate_object then
        null;
    end;

    begin
      execute 'alter table public.user_settings add constraint user_settings_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade';
    exception
      when duplicate_object then
        null;
    end;
  end if;
end $$;

-- RLS policies (use ::text casts to be resilient during/after migrations).
alter table public.user_settings enable row level security;

drop policy if exists "read own settings" on public.user_settings;
drop policy if exists "update own settings" on public.user_settings;

create policy "read own settings"
  on public.user_settings
  for select
  using (auth.uid()::text = user_id::text);

create policy "update own settings"
  on public.user_settings
  for update
  using (auth.uid()::text = user_id::text)
  with check (auth.uid()::text = user_id::text);

-- Self-healing bootstrap: creates a default workspace + membership + user_settings
-- for the currently authenticated user if missing.
create or replace function public.ensure_user_bootstrap()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_workspace_id uuid;
  v_workspace_name text;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- If settings already exist with a default workspace, return it.
  select us.default_workspace_id
    into v_workspace_id
  from public.user_settings us
  where us.user_id = v_user_id;

  if v_workspace_id is not null then
    return v_workspace_id;
  end if;

  -- Ensure a workspace exists and point settings at it.
  v_workspace_name := 'My workspace';

  insert into public.workspaces (name, owner_user_id)
  values (v_workspace_name, v_user_id)
  returning id into v_workspace_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (v_workspace_id, v_user_id, 'owner')
  on conflict do nothing;

  insert into public.user_settings (user_id, default_workspace_id)
  values (v_user_id, v_workspace_id)
  on conflict (user_id) do update
    set default_workspace_id = excluded.default_workspace_id;

  return v_workspace_id;
end;
$$;

grant execute on function public.ensure_user_bootstrap() to authenticated;
