create table if not exists public.billing_email_events (
  event_id text primary key,
  provider text not null,
  session_id text,
  email text,
  created_at timestamptz not null default now()
);
