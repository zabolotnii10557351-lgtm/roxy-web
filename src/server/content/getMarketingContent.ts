import type { Locale } from "@/i18n/locales";
import { getContent, type MarketingContent } from "@/i18n/content";
import { createSupabaseAdminClient } from "@/lib/auth";
import { DEFAULT_LOCALE } from "@/lib/content/fallback";

const MARKETING_CONTENT_KEY = "marketing.content";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override as T) ?? base;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = (base as Record<string, unknown>)[key];

    if (Array.isArray(value)) {
      result[key] = value;
    } else if (isPlainObject(value) && isPlainObject(baseValue)) {
      result[key] = mergeDeep(baseValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as T;
}

function safeJsonParse(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function fetchMarketingOverride(locale: Locale) {
  const adminClient = createSupabaseAdminClient();
  if (!adminClient) return null;

  const { data } = await adminClient
    .from("content_blocks")
    .select("markdown, is_published")
    .eq("key", MARKETING_CONTENT_KEY)
    .eq("locale", locale)
    .maybeSingle();

  if (!data?.is_published || !data.markdown) return null;

  return safeJsonParse(data.markdown);
}

export async function getMarketingContent(locale: Locale): Promise<MarketingContent> {
  const fallback = getContent(locale);

  const override = await fetchMarketingOverride(locale);
  if (override && isPlainObject(override)) {
    return mergeDeep(fallback, override);
  }

  if (locale !== DEFAULT_LOCALE) {
    const defaultOverride = await fetchMarketingOverride(DEFAULT_LOCALE as Locale);
    if (defaultOverride && isPlainObject(defaultOverride)) {
      return mergeDeep(fallback, defaultOverride);
    }
  }

  return fallback;
}
