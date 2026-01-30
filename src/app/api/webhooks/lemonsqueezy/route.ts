export const runtime = "nodejs";

import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  ENTITLEMENTS,
  VARIANTS,
  CREDIT_PACK_MINUTES,
} from "@/lib/billing/variants";

function planFromVariant(variantId: string) {
  const basicVariants = [VARIANTS.basic.monthly, VARIANTS.basic.yearly] as string[];
  const proVariants = [VARIANTS.pro.monthly, VARIANTS.pro.yearly] as string[];
  const studioVariants = [VARIANTS.studio.monthly, VARIANTS.studio.yearly] as string[];

  if (basicVariants.includes(variantId)) {
    return "basic";
  }
  if (proVariants.includes(variantId)) {
    return "pro";
  }
  if (studioVariants.includes(variantId)) {
    return "studio";
  }
  return null;
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const rawBody = await request.text();
  const sigHex = request.headers.get("X-Signature") ?? "";

  if (!sigHex) {
    return NextResponse.json("Missing signature", { status: 400 });
  }

  const computedHex = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (sigHex.length !== computedHex.length) {
    return NextResponse.json("Invalid signature", { status: 400 });
  }

  const ok = crypto.timingSafeEqual(
    Buffer.from(sigHex, "hex"),
    Buffer.from(computedHex, "hex")
  );

  if (!ok) {
    return NextResponse.json("Invalid signature", { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const eventName: string = payload?.meta?.event_name;
  const userId: string = payload?.meta?.custom_data?.user_id;
  const attrs = payload?.data?.attributes ?? {};
  const variantId: string = (attrs?.variant_id ?? "").toString();
  const subscriptionId: string = (payload?.data?.id ?? "").toString();
  const lsStatus: string = (attrs?.status ?? "").toString();

  if (!eventName || !userId) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  if (eventName.startsWith("subscription_")) {
    const plan = planFromVariant(variantId);
    if (plan) {
      const active = ["active", "on_trial", "paused", "past_due"].includes(
        lsStatus
      );
      if (active) {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan,
            plan_id: plan,
            status: "active",
            subscription_id: subscriptionId,
            variant_id: variantId,
            entitlements: (ENTITLEMENTS as any)[plan],
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      } else {
        await supabaseAdmin
          .from("profiles")
          .update({
            plan: "trial",
            plan_id: "trial",
            status: "expired",
            entitlements: ENTITLEMENTS.trial,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }
    }

    if (variantId === VARIANTS.unrealConnector.monthly) {
      const active = ["active", "on_trial", "paused", "past_due"].includes(
        lsStatus
      );
      await supabaseAdmin
        .from("profiles")
        .update({
          addons: active ? { unreal_connector: "monthly" } : {},
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    }
  }

  if (eventName === "order_created") {
    const addMinutes = CREDIT_PACK_MINUTES[variantId];
    if (addMinutes) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("credits_minutes")
        .eq("id", userId)
        .single();

      const newVal = (profile?.credits_minutes ?? 0) + addMinutes;
      await supabaseAdmin
        .from("profiles")
        .update({
          credits_minutes: newVal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    }

    if (variantId === VARIANTS.unrealConnector.lifetime) {
      await supabaseAdmin
        .from("profiles")
        .update({
          addons: { unreal_connector: "lifetime" },
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
    }
  }

  return NextResponse.json("OK");
}
