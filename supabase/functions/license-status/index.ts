import { corsHeaders } from '../_shared/cors.ts';
import { createAnonClient, createServiceClient } from '../_shared/supabase.ts';
import { isUpdateRequired } from '../_shared/semver.ts';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function errorResponse(message: string, status = 400) {
  return jsonResponse({ error: message }, status);
}

function isDateInFuture(dateValue: string | null): boolean {
  if (!dateValue) return false;
  const dateMs = Date.parse(dateValue);
  if (Number.isNaN(dateMs)) return false;
  return Date.now() < dateMs;
}

function isPaidActive(currentPeriodEnd: string | null): boolean {
  if (!currentPeriodEnd) return true;
  return isDateInFuture(currentPeriodEnd);
}

function isLicenseActive(
  status: string,
  currentPeriodEnd: string | null,
  trialEnd: string | null,
): boolean {
  return (
    (status === 'active' && isPaidActive(currentPeriodEnd)) ||
    (status === 'trialing' && trialEnd != null && isDateInFuture(trialEnd))
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return errorResponse('Method not allowed', 405);

  const anon = createAnonClient(req);
  const { data: authData, error: authError } = await anon.auth.getUser();
  if (authError || !authData?.user) return errorResponse('Unauthorized', 401);

  const userId = authData.user.id;
  const url = new URL(req.url);
  const appVersion = url.searchParams.get('app_version') ?? undefined;

  const service = createServiceClient();

  const { data: policy, error: policyError } = await service
    .from('app_policy')
    .select('min_version, blocked_versions, force_update')
    .eq('id', 1)
    .maybeSingle();

  if (policyError) return errorResponse('Failed to load app policy', 500);

  const blockedVersions = policy?.blocked_versions ?? [];
  const blocked = appVersion ? blockedVersions.includes(appVersion) : false;
  const minVersion = policy?.min_version ?? '0.0.0';
  const updateRequired = isUpdateRequired(appVersion, minVersion);

  const { data: license, error: licenseError } = await service
    .from('licenses')
    .select('status, plan, current_period_end, trial_end, max_devices, features')
    .eq('user_id', userId)
    .maybeSingle();

  if (licenseError) return errorResponse('Failed to load license', 500);

  const status = license?.status ?? 'none';
  const active = isLicenseActive(
    status,
    license?.current_period_end ?? null,
    license?.trial_end ?? null,
  );

  return jsonResponse({
    active,
    status,
    plan: license?.plan ?? 'none',
    current_period_end: license?.current_period_end ?? null,
    trial_end: license?.trial_end ?? null,
    max_devices: license?.max_devices ?? 0,
    features: license?.features ?? {},
    policy: {
      min_version: minVersion,
      force_update: policy?.force_update ?? false,
      blocked,
      update_required: updateRequired,
    },
  });
});
