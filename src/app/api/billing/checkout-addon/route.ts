import { NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { createLemonCheckout } from "@/server/lemon/client";
import { getAddonPackMapping, type AddonPackId } from "@/config/lemon";
import { supabaseAdmin } from "@/lib/supabase/admin";

function getErrorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return "Failed to create checkout.";
}

export async function POST(req: Request) {
  const { supabase, user, workspaceId } = await requireUserAndWorkspace();

  const bodyUnknown = (await req.json().catch(() => null)) as unknown;
  if (!bodyUnknown || typeof bodyUnknown !== "object") {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const body = bodyUnknown as Record<string, unknown>;

  const packId = String(body["packId"] ?? "") as AddonPackId;
  const successUrl = String(body["successUrl"] ?? "");
  const cancelUrl = String(body["cancelUrl"] ?? "");

  if (!successUrl || !cancelUrl) {
    return NextResponse.json(
      { error: "successUrl and cancelUrl are required." },
      { status: 400 }
    );
  }

  if (!(packId === "as_2h" || packId === "as_10h" || packId === "as_25h")) {
    return NextResponse.json({ error: "Unsupported pack." }, { status: 400 });
  }

  const mapping = getAddonPackMapping(packId);

  const { data: billingRow } = await supabase
    .from("billing_state")
    .select("lemon_customer_id")
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  const customData = {
    workspace_id: workspaceId,
    workspaceId,
    kind: "addon",
    packId,
    amountSeconds: mapping.amountSeconds,
    user_id: user.id,
  };

  try {
    const checkout = await createLemonCheckout({
      variantId: mapping.variantId,
      successUrl,
      cancelUrl,
      customData,
      customerId: billingRow?.lemon_customer_id ?? null,
      email: user.email ?? null,
    });

    await supabaseAdmin
      .from("billing_state")
      .upsert({ workspace_id: workspaceId, plan_id: "starter", status: "trialing" });

    return NextResponse.json({ url: checkout.url });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(e) },
      { status: 400 }
    );
  }
}
