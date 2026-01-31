-- Task 6/9: LemonSqueezy integration (test-mode ready, prod-style architecture)

create extension if not exists "pgcrypto";

-- Expand billing_state to store Lemon subscription metadata
alter table public.billing_state
  add column if not exists status text not null default 'trialing',
  add column if not exists current_period_start timestamptz null,
  add column if not exists current_period_end timestamptz null,
  add column if not exists lemon_customer_id text null,
  add column if not exists lemon_subscription_id text null,
  add column if not exists lemon_variant_id text null,
  add column if not exists cancel_at_period_end boolean not null default false;

-- lemon_events for webhook idempotency
create table if not exists public.lemon_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  received_at timestamptz default now()
);

alter table public.lemon_events enable row level security;
-- No policies: only service role/server should access

-- add external identifiers for add-on purchases
alter table public.add_on_credits
  add column if not exists external_order_id text null,
  add column if not exists external_invoice_id text null;

create index if not exists add_on_credits_workspace_external_order_idx
  on public.add_on_credits (workspace_id, external_order_id);
