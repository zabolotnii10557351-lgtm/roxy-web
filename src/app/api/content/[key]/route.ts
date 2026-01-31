import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/auth";
import { CONTENT_FALLBACK, DEFAULT_LOCALE } from "@/lib/content/fallback";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params;

  // Locale is optional. Default to en.
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") || DEFAULT_LOCALE;

  try {
    const adminClient = createSupabaseAdminClient();

    if (adminClient) {
      const { data: exact } = await adminClient
        .from("content_blocks")
        .select("markdown, is_published")
        .eq("key", key)
        .eq("locale", locale)
        .maybeSingle();

      if (exact?.is_published && exact.markdown) {
        return NextResponse.json({ key, locale, markdown: exact.markdown, source: "db" });
      }

      if (locale !== DEFAULT_LOCALE) {
        const { data: fallback } = await adminClient
          .from("content_blocks")
          .select("markdown, is_published")
          .eq("key", key)
          .eq("locale", DEFAULT_LOCALE)
          .maybeSingle();

        if (fallback?.is_published && fallback.markdown) {
          return NextResponse.json({
            key,
            locale,
            markdown: fallback.markdown,
            source: "db_default_locale",
          });
        }
      }
    }

    const local = CONTENT_FALLBACK[key];

    if (!local) {
      return NextResponse.json(
        { key, locale, markdown: "", source: "missing" },
        { status: 404 },
      );
    }

    return NextResponse.json({ key, locale, markdown: local, source: "local" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
