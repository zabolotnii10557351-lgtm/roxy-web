import { createSupabaseAdminClient } from "@/lib/auth";
import { CONTENT_FALLBACK, DEFAULT_LOCALE } from "@/lib/content/fallback";

export async function getContentBlock(params: {
  key: string;
  locale?: string;
}): Promise<string> {
  const locale = params.locale ?? DEFAULT_LOCALE;
  const adminClient = createSupabaseAdminClient();

  if (adminClient) {
    const { data: exact } = await adminClient
      .from("content_blocks")
      .select("markdown, is_published")
      .eq("key", params.key)
      .eq("locale", locale)
      .maybeSingle();

    if (exact?.is_published && exact.markdown) {
      return exact.markdown;
    }

    if (locale !== DEFAULT_LOCALE) {
      const { data: fallback } = await adminClient
        .from("content_blocks")
        .select("markdown, is_published")
        .eq("key", params.key)
        .eq("locale", DEFAULT_LOCALE)
        .maybeSingle();

      if (fallback?.is_published && fallback.markdown) {
        return fallback.markdown;
      }
    }
  }

  return CONTENT_FALLBACK[params.key] ?? "";
}
