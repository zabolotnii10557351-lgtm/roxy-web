-- Task 4/9: AI Providers (Brain + Voice), BYOK secrets, workspace settings

-- Workspace-scoped AI settings
create table if not exists public.workspace_ai_settings (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  brain_provider text not null default 'openai',
  brain_model text not null default 'gpt-4o-mini',
  voice_provider text not null default 'openai',
  voice_voice_id text not null default 'alloy',
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

drop trigger if exists set_updated_at_workspace_ai_settings on public.workspace_ai_settings;
create trigger set_updated_at_workspace_ai_settings
before update on public.workspace_ai_settings
for each row execute procedure public.set_updated_at();

alter table public.workspace_ai_settings enable row level security;

drop policy if exists "workspace members can read workspace_ai_settings" on public.workspace_ai_settings;
drop policy if exists "workspace members can insert workspace_ai_settings" on public.workspace_ai_settings;
drop policy if exists "workspace members can update workspace_ai_settings" on public.workspace_ai_settings;

create policy "workspace members can read workspace_ai_settings"
  on public.workspace_ai_settings
  for select
  using (public.is_workspace_member(workspace_id));

create policy "workspace members can insert workspace_ai_settings"
  on public.workspace_ai_settings
  for insert
  with check (public.is_workspace_member(workspace_id));

create policy "workspace members can update workspace_ai_settings"
  on public.workspace_ai_settings
  for update
  using (public.is_workspace_member(workspace_id))
  with check (public.is_workspace_member(workspace_id));

-- User-scoped secrets (BYOK)
-- NOTE: MVP stores API keys as plaintext in DB. RLS prevents SELECT for users.
-- Keys are only read server-side using service role.
create table if not exists public.user_secrets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  openai_api_key text null,
  elevenlabs_api_key text null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists set_updated_at_user_secrets on public.user_secrets;
create trigger set_updated_at_user_secrets
before update on public.user_secrets
for each row execute procedure public.set_updated_at();

alter table public.user_secrets enable row level security;

-- Do NOT create a SELECT policy. Users must not read raw keys.

drop policy if exists "user can insert own secrets" on public.user_secrets;
drop policy if exists "user can update own secrets" on public.user_secrets;
drop policy if exists "user can delete own secrets" on public.user_secrets;

create policy "user can insert own secrets"
  on public.user_secrets
  for insert
  with check (auth.uid() = user_id);

create policy "user can update own secrets"
  on public.user_secrets
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user can delete own secrets"
  on public.user_secrets
  for delete
  using (auth.uid() = user_id);

-- RPC helpers: flags only + set/remove, without ever returning the key
create or replace function public.get_user_secret_flags()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_openai boolean;
  v_eleven boolean;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select (openai_api_key is not null and length(openai_api_key) > 0),
         (elevenlabs_api_key is not null and length(elevenlabs_api_key) > 0)
    into v_openai, v_eleven
  from public.user_secrets
  where user_id = v_user_id;

  return jsonb_build_object(
    'openai_has_key', coalesce(v_openai, false),
    'elevenlabs_has_key', coalesce(v_eleven, false)
  );
end;
$$;

grant execute on function public.get_user_secret_flags() to authenticated;

create or replace function public.set_user_secret(p_provider text, p_api_key text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_api_key is null or length(trim(p_api_key)) = 0 then
    raise exception 'API key is required';
  end if;

  if p_provider not in ('openai', 'elevenlabs') then
    raise exception 'Unsupported provider';
  end if;

  insert into public.user_secrets (user_id, openai_api_key, elevenlabs_api_key)
  values (
    v_user_id,
    case when p_provider = 'openai' then trim(p_api_key) else null end,
    case when p_provider = 'elevenlabs' then trim(p_api_key) else null end
  )
  on conflict (user_id) do update
    set openai_api_key = case when p_provider = 'openai' then trim(p_api_key) else public.user_secrets.openai_api_key end,
        elevenlabs_api_key = case when p_provider = 'elevenlabs' then trim(p_api_key) else public.user_secrets.elevenlabs_api_key end;

  return public.get_user_secret_flags();
end;
$$;

grant execute on function public.set_user_secret(text, text) to authenticated;

create or replace function public.remove_user_secret(p_provider text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_provider not in ('openai', 'elevenlabs') then
    raise exception 'Unsupported provider';
  end if;

  insert into public.user_secrets (user_id, openai_api_key, elevenlabs_api_key)
  values (v_user_id, null, null)
  on conflict (user_id) do nothing;

  update public.user_secrets
  set openai_api_key = case when p_provider = 'openai' then null else openai_api_key end,
      elevenlabs_api_key = case when p_provider = 'elevenlabs' then null else elevenlabs_api_key end
  where user_id = v_user_id;

  return public.get_user_secret_flags();
end;
$$;

grant execute on function public.remove_user_secret(text) to authenticated;
