import { ENTITLEMENTS } from "@/lib/billing/variants";

export function computeEffective(profile: any) {
  const now = Date.now();
  const trialEnds = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at).getTime()
    : 0;
  let base = profile?.entitlements ?? ENTITLEMENTS.trial;

  if (profile?.status === "trialing" && trialEnds && now > trialEnds) {
    base = ENTITLEMENTS.trial;
  }

  const out = structuredClone(base);
  if (profile?.addons?.unreal_connector) {
    out.flags.unreal_connector = true;
  }

  return out;
}
