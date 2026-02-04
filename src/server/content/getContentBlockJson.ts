import { getContentBlock } from "@/server/content/getContentBlock";

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function getContentBlockJson<T>(params: {
  key: string;
  locale?: string;
  fallback: T;
}): Promise<T> {
  const raw = await getContentBlock({ key: params.key, locale: params.locale });
  if (!raw) return params.fallback;

  const parsed = safeJsonParse<T>(raw);
  if (parsed === null || typeof parsed !== "object") {
    return params.fallback;
  }

  return parsed;
}
