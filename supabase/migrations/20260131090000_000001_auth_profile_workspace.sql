-- Task 2/9: Auth + profiles + workspaces (multi-tenancy)

create extension if not exists "pgcrypto";

-- Ensure profiles has required columns for real user profile
alter table public.profiles
  add column if not exists display_name text;

alter table public.profiles
  add column if not exists username text;

alter table public.profiles
  add column if not exists avatar_url text;

-- Backfill + enforce display_name NOT NULL
update public.profiles
set display_name = coalesce(nullif(display_name, ''), 'User')
where display_name is null or display_name = '';

alter table public.profiles
  alter column display_name set default 'User';

alter table public.profiles
  alter column display_name set not null;

-- Unique username (nullable)
create unique index if not exists profiles_username_unique
  on public.profiles (username)
  where username is not null;

-- Workspaces
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.workspace_members (
  workspace_id uuid references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','member')),
  created_at timestamptz default now(),
  primary key (workspace_id, user_id)
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  default_workspace_id uuid references public.workspaces(id),
  default_language text default 'en',
  talk_ratio numeric default 0.20,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Placeholder entity tables for task 3/9
create table if not exists public.characters (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  config jsonb,
  created_at timestamptz default now()
);

create table if not exists public.connectors (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  provider text not null,
  config jsonb,
  created_at timestamptz default now()
);

create table if not exists public.dono_rules (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  config jsonb,
  created_at timestamptz default now()
);

create table if not exists public.stream_scripts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  config jsonb,
  created_at timestamptz default now()
);

create table if not exists public.scenes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  config jsonb,
  created_at timestamptz default now()
);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach updated_at triggers
drop trigger if exists set_updated_at_profiles on public.profiles;
create trigger set_updated_at_profiles
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at_workspaces on public.workspaces;
create trigger set_updated_at_workspaces
before update on public.workspaces
for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at_user_settings on public.user_settings;
create trigger set_updated_at_user_settings
before update on public.user_settings
for each row execute procedure public.set_updated_at();

-- Auto-create profile + workspace + membership + user_settings on signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_display_name text;
  v_username text;
  v_workspace_id uuid;
  v_workspace_name text;
  v_username_taken boolean;
  v_has_settings boolean;
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

  -- Ensure default workspace + settings exist
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

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.user_settings enable row level security;
alter table public.characters enable row level security;
alter table public.connectors enable row level security;
alter table public.dono_rules enable row level security;
alter table public.stream_scripts enable row level security;
alter table public.scenes enable row level security;

-- Profiles: select/update only own row
drop policy if exists "read own profile" on public.profiles;
drop policy if exists "Profiles are updatable by owner" on public.profiles;
drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "read own profile"
  on public.profiles
  for select
  using (auth.uid() = id);
create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Workspaces: select only where user is a member
drop policy if exists "members can view workspaces" on public.workspaces;
create policy "members can view workspaces"
  on public.workspaces
  for select
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = workspaces.id
        and wm.user_id = auth.uid()
    )
  );

-- Workspace members: select only for workspaces where user is member
drop policy if exists "members can view workspace members" on public.workspace_members;
create policy "members can view workspace members"
  on public.workspace_members
  for select
  using (
    exists (
      select 1
      from public.workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id
        and wm.user_id = auth.uid()
    )
  );

-- User settings: select/update only own row
drop policy if exists "read own settings" on public.user_settings;
drop policy if exists "update own settings" on public.user_settings;
create policy "read own settings"
  on public.user_settings
  for select
  using (auth.uid() = user_id);
create policy "update own settings"
  on public.user_settings
  for update
  using (auth.uid() = user_id);

-- Entity policies: CRUD only if membership exists
create or replace function public.is_workspace_member(p_workspace_id uuid)
returns boolean as $$
  select exists(
    select 1 from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
  );
$$ language sql stable;

-- characters
drop policy if exists "workspace members can read characters" on public.characters;
drop policy if exists "workspace members can insert characters" on public.characters;
drop policy if exists "workspace members can update characters" on public.characters;
drop policy if exists "workspace members can delete characters" on public.characters;
create policy "workspace members can read characters" on public.characters for select using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert characters" on public.characters for insert with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update characters" on public.characters for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete characters" on public.characters for delete using (public.is_workspace_member(workspace_id));

-- connectors
drop policy if exists "workspace members can read connectors" on public.connectors;
drop policy if exists "workspace members can insert connectors" on public.connectors;
drop policy if exists "workspace members can update connectors" on public.connectors;
drop policy if exists "workspace members can delete connectors" on public.connectors;
create policy "workspace members can read connectors" on public.connectors for select using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert connectors" on public.connectors for insert with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update connectors" on public.connectors for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete connectors" on public.connectors for delete using (public.is_workspace_member(workspace_id));

-- dono_rules
drop policy if exists "workspace members can read dono_rules" on public.dono_rules;
drop policy if exists "workspace members can insert dono_rules" on public.dono_rules;
drop policy if exists "workspace members can update dono_rules" on public.dono_rules;
drop policy if exists "workspace members can delete dono_rules" on public.dono_rules;
create policy "workspace members can read dono_rules" on public.dono_rules for select using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert dono_rules" on public.dono_rules for insert with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update dono_rules" on public.dono_rules for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete dono_rules" on public.dono_rules for delete using (public.is_workspace_member(workspace_id));

-- stream_scripts
drop policy if exists "workspace members can read stream_scripts" on public.stream_scripts;
drop policy if exists "workspace members can insert stream_scripts" on public.stream_scripts;
drop policy if exists "workspace members can update stream_scripts" on public.stream_scripts;
drop policy if exists "workspace members can delete stream_scripts" on public.stream_scripts;
create policy "workspace members can read stream_scripts" on public.stream_scripts for select using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert stream_scripts" on public.stream_scripts for insert with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update stream_scripts" on public.stream_scripts for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete stream_scripts" on public.stream_scripts for delete using (public.is_workspace_member(workspace_id));

-- scenes
drop policy if exists "workspace members can read scenes" on public.scenes;
drop policy if exists "workspace members can insert scenes" on public.scenes;
drop policy if exists "workspace members can update scenes" on public.scenes;
drop policy if exists "workspace members can delete scenes" on public.scenes;
create policy "workspace members can read scenes" on public.scenes for select using (public.is_workspace_member(workspace_id));
create policy "workspace members can insert scenes" on public.scenes for insert with check (public.is_workspace_member(workspace_id));
create policy "workspace members can update scenes" on public.scenes for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy "workspace members can delete scenes" on public.scenes for delete using (public.is_workspace_member(workspace_id));
