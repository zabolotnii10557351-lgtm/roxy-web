-- Add Stripe columns and entitlement view for desktop/web

alter table public.billing_state
  add column if not exists stripe_customer_id text null,
  add column if not exists stripe_subscription_id text null,
  add column if not exists stripe_price_id text null,
  add column if not exists stripe_product_id text null;

create or replace view public.v_my_entitlement as
select
  bs.workspace_id,
  bs.plan_id,
  bs.status,
  bs.trial_end,
  bs.current_period_end,
  bs.cancel_at_period_end,
  coalesce(bs.current_period_end, bs.trial_end) as active_until,
  (
    bs.status in ('active', 'trialing')
    and (
      coalesce(bs.current_period_end, bs.trial_end) is null
      or coalesce(bs.current_period_end, bs.trial_end) >= now()
    )
  ) as is_active
from public.billing_state bs
join public.user_settings us
  on us.default_workspace_id = bs.workspace_id
where us.user_id = auth.uid();

grant select on public.v_my_entitlement to authenticated;
