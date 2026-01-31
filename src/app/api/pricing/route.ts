import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/auth";
import { getDefaultPricingConfig, PricingConfigSchema } from "@/lib/pricing/config";

export async function GET() {
  try {
    const adminClient = createSupabaseAdminClient();

    if (adminClient) {
      const { data, error } = await adminClient
        .from("pricing_config")
        .select("version, is_active, json")
        .eq("is_active", true)
        .order("version", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        return NextResponse.json(
          { error: error.message, source: "db" },
          { status: 500 },
        );
      }

      if (data?.json) {
        const parsed = PricingConfigSchema.safeParse({
          version: data.version,
          ...(data.json as object),
        });

        if (parsed.success) {
          return NextResponse.json({ config: parsed.data, source: "db" });
        }

        return NextResponse.json(
          { error: "Invalid pricing config in database", source: "db" },
          { status: 500 },
        );
      }
    }

    const fallback = getDefaultPricingConfig();
    return NextResponse.json({
      config: { version: 1, ...fallback },
      source: "local",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
