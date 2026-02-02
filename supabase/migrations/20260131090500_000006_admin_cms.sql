-- Task 7/9: Admin console + RBAC + CMS + audit logs

create extension if not exists "pgcrypto";

-- RBAC role on profiles
alter table public.profiles
  add column if not exists role text;

do $$
begin
  -- Backfill + enforce allowed roles
  update public.profiles
  set role = 'user'
  where role is null or role = '';

  alter table public.profiles
    alter column role set default 'user';

  alter table public.profiles
    alter column role set not null;

  -- Add constraint if not present
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('user','admin'));
  end if;
end $$;

-- Helper for admin-only RLS checks.
create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1
    from public.profiles p
    where p.id = user_id
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

-- Admin audit logs
create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  action text not null,
  target_type text null,
  target_id text null,
  payload jsonb not null,
  created_at timestamptz default now()
);

-- Pricing config (versioned)
create table if not exists public.pricing_config (
  id uuid primary key default gen_random_uuid(),
  version int not null unique,
  is_active boolean default false,
  json jsonb not null,
  created_at timestamptz default now(),
  created_by uuid null references auth.users(id)
);

create index if not exists pricing_config_active_idx
  on public.pricing_config (is_active)
  where is_active = true;

-- Content blocks (key-based)
create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  locale text not null default 'en',
  markdown text not null,
  is_published boolean default true,
  updated_at timestamptz default now(),
  updated_by uuid null references auth.users(id),
  unique (key, locale)
);

-- Leads (admin view only)
create table if not exists public.waitlist_emails (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text null,
  status text not null default 'new',
  created_at timestamptz default now()
);

create index if not exists waitlist_emails_created_at_idx on public.waitlist_emails (created_at desc);
create index if not exists waitlist_emails_email_idx on public.waitlist_emails (email);

create table if not exists public.investor_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text null,
  firm text null,
  message text null,
  source text null,
  status text not null default 'new',
  created_at timestamptz default now()
);

create index if not exists investor_leads_created_at_idx on public.investor_leads (created_at desc);
create index if not exists investor_leads_email_idx on public.investor_leads (email);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text null,
  last_name text null,
  message text not null,
  source text null,
  status text not null default 'new',
  created_at timestamptz default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_email_idx on public.contact_messages (email);

-- Optional admin notes (can attach to user or lead)
create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null,
  target_id text not null,
  note text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.admin_audit_logs enable row level security;
alter table public.pricing_config enable row level security;
alter table public.content_blocks enable row level security;
alter table public.waitlist_emails enable row level security;
alter table public.investor_leads enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_notes enable row level security;

-- Admin-only policies (no direct access for non-admins)

do $$
begin
  -- admin_audit_logs
  drop policy if exists "admin only" on public.admin_audit_logs;
  create policy "admin only" on public.admin_audit_logs
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  -- pricing_config
  drop policy if exists "admin only" on public.pricing_config;
  create policy "admin only" on public.pricing_config
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  -- content_blocks
  drop policy if exists "admin only" on public.content_blocks;
  create policy "admin only" on public.content_blocks
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  -- leads tables
  drop policy if exists "admin only" on public.waitlist_emails;
  create policy "admin only" on public.waitlist_emails
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  drop policy if exists "admin only" on public.investor_leads;
  create policy "admin only" on public.investor_leads
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  drop policy if exists "admin only" on public.contact_messages;
  create policy "admin only" on public.contact_messages
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));

  -- admin_notes
  drop policy if exists "admin only" on public.admin_notes;
  create policy "admin only" on public.admin_notes
    for all
    using (public.is_admin(auth.uid()))
    with check (public.is_admin(auth.uid()));
end $$;

-- Keep content_blocks updated_at current
create trigger set_updated_at_content_blocks
before update on public.content_blocks
for each row execute procedure public.set_updated_at();
