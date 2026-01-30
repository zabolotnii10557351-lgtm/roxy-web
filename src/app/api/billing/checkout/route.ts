export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { VARIANTS } from "@/lib/billing/variants";

function lsHeaders() {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
  };
}

export async function POST(req: NextRequest) {
  const { access_token, kind, plan, interval, pack } = await req.json();

  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(
    access_token
  );

  if (userErr || !userData?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userData.user.id;
  let variantId: string | null = null;

  if (kind === "plan") {
    if (plan === "basic") {
      variantId =
        interval === "yearly" ? VARIANTS.basic.yearly : VARIANTS.basic.monthly;
    }
    if (plan === "pro") {
      variantId =
        interval === "yearly" ? VARIANTS.pro.yearly : VARIANTS.pro.monthly;
    }
    if (plan === "studio") {
      variantId =
        interval === "yearly" ? VARIANTS.studio.yearly : VARIANTS.studio.monthly;
    }
  }

  if (kind === "credits") {
    if (pack === "h10") variantId = VARIANTS.extraCredits.h10;
    if (pack === "h50") variantId = VARIANTS.extraCredits.h50;
    if (pack === "h200") variantId = VARIANTS.extraCredits.h200;
  }

  if (kind === "unreal") {
    if (interval === "monthly") variantId = VARIANTS.unrealConnector.monthly;
    if (interval === "lifetime") variantId = VARIANTS.unrealConnector.lifetime;
  }

  if (!variantId) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/app/billing/success`;

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        product_options: {
          redirect_url: redirectUrl,
        },
        checkout_data: {
          custom: {
            user_id: userId,
          },
        },
      },
      relationships: {
        store: {
          data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
        },
        variant: {
          data: { type: "variants", id: variantId },
        },
      },
    },
  };

  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: lsHeaders(),
    body: JSON.stringify(body),
  });

  const json = await response.json();
  const url = json?.data?.attributes?.url;

  if (!url) {
    return NextResponse.json({ error: "No checkout url", json }, { status: 500 });
  }

  return NextResponse.json({ url });
}
