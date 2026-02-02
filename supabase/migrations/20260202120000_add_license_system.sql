-- Add account-based license system (licenses + device registrations + app policy)

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null check (status in ('active','trialing','past_due','canceled','suspended')),
  plan text not null,
  current_period_end timestamptz,
  trial_end timestamptz,
  max_devices int not null default 1,
  features jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists licenses_user_id_idx on public.licenses(user_id);

create table if not exists public.license_devices (
  id uuid primary key default gen_random_uuid(),
  license_id uuid not null references public.licenses(id) on delete cascade,
  device_id text not null,
  device_name text,
  last_seen_at timestamptz,
  created_at timestamptz default now(),
  constraint license_devices_license_id_device_id_key unique (license_id, device_id)
);

create table if not exists public.app_policy (
  id int primary key default 1,
  min_version text not null,
  blocked_versions text[] not null default '{}',
  force_update boolean not null default false,
  updated_at timestamptz default now(),
  constraint app_policy_singleton_row check (id = 1)
);

insert into public.app_policy (id, min_version, blocked_versions, force_update)
select 1, '0.0.0', '{}'::text[], false
where not exists (select 1 from public.app_policy where id = 1);

alter table public.licenses enable row level security;
alter table public.license_devices enable row level security;
alter table public.app_policy enable row level security;

-- licenses: allow users to read only their own license
create policy "licenses_select_own"
  on public.licenses
  for select
  to authenticated
  using (user_id = auth.uid());

-- license_devices: allow users to read devices for their own license
create policy "license_devices_select_own"
  on public.license_devices
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.licenses l
      where l.id = license_devices.license_id
        and l.user_id = auth.uid()
    )
  );

-- app_policy: allow authenticated users to read app policy
create policy "app_policy_select_authenticated"
  on public.app_policy
  for select
  to authenticated
  using (true);
