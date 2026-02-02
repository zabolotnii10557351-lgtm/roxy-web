import { corsHeaders } from '../_shared/cors.ts';
import { createAnonClient, createServiceClient } from '../_shared/supabase.ts';
import { isUpdateRequired } from '../_shared/semver.ts';

type HeartbeatBody = {
  device_id: string;
  device_name?: string;
  app_version: string;
};

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
  if (req.method !== 'POST') return errorResponse('Method not allowed', 405);

  const anon = createAnonClient(req);
  const { data: authData, error: authError } = await anon.auth.getUser();
  if (authError || !authData?.user) return errorResponse('Unauthorized', 401);

  let body: HeartbeatBody;
  try {
    body = (await req.json()) as HeartbeatBody;
  } catch {
    return errorResponse('Invalid JSON body', 400);
  }

  if (!body.device_id || typeof body.device_id !== 'string') return errorResponse('device_id is required', 400);
  if (!body.app_version || typeof body.app_version !== 'string') return errorResponse('app_version is required', 400);
  if (body.device_name != null && typeof body.device_name !== 'string') return errorResponse('device_name must be a string', 400);

  const userId = authData.user.id;
  const service = createServiceClient();

  const { data: policy, error: policyError } = await service
    .from('app_policy')
    .select('min_version, blocked_versions, force_update')
    .eq('id', 1)
    .maybeSingle();

  if (policyError) return errorResponse('Failed to load app policy', 500);

  const blockedVersions = policy?.blocked_versions ?? [];
  const blocked = blockedVersions.includes(body.app_version);
  const minVersion = policy?.min_version ?? '0.0.0';
  const updateRequired = isUpdateRequired(body.app_version, minVersion);

  const { data: license, error: licenseError } = await service
    .from('licenses')
    .select('id, status, plan, current_period_end, trial_end, max_devices, features')
    .eq('user_id', userId)
    .maybeSingle();

  if (licenseError) return errorResponse('Failed to load license', 500);

  const status = license?.status ?? 'none';
  const active = isLicenseActive(
    status,
    license?.current_period_end ?? null,
    license?.trial_end ?? null,
  );

  if (!active || !license) return errorResponse('No active license', 403);

  // Enforce device limit only when registering a new device_id
  const { data: existingDevice, error: existingDeviceError } = await service
    .from('license_devices')
    .select('id')
    .eq('license_id', license.id)
    .eq('device_id', body.device_id)
    .maybeSingle();

  if (existingDeviceError) return errorResponse('Failed to check device registration', 500);

  if (!existingDevice) {
    const { count, error: countError } = await service
      .from('license_devices')
      .select('id', { count: 'exact', head: true })
      .eq('license_id', license.id);

    if (countError) return errorResponse('Failed to enforce device limit', 500);

    if ((count ?? 0) >= (license.max_devices ?? 1)) {
      return errorResponse('Device limit exceeded', 403);
    }
  }

  const now = new Date().toISOString();

  const { error: upsertError } = await service
    .from('license_devices')
    .upsert(
      {
        license_id: license.id,
        device_id: body.device_id,
        device_name: body.device_name ?? null,
        last_seen_at: now,
      },
      { onConflict: 'license_id,device_id' },
    );

  if (upsertError) return errorResponse('Failed to record heartbeat', 500);

  return jsonResponse({
    ok: true,
    policy: {
      min_version: minVersion,
      force_update: policy?.force_update ?? false,
      blocked,
      update_required: updateRequired,
    },
  });
});
