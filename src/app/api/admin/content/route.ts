import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminForAction } from "@/lib/auth";
import type { Locale } from "@/i18n/locales";
import { getContent } from "@/i18n/content";
import { DEFAULT_LOCALE } from "@/lib/content/fallback";
import { getHomeContentFallback } from "@/lib/content/homeContent";
import { writeAdminAuditLog } from "@/server/admin/audit";
import { rateLimitSlidingWindow } from "@/server/rateLimit";

function getIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0] : null)?.trim() || "local";
}

export async function GET(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:content:get:${user.id}:${ip}`,
      limit: 120,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const url = new URL(req.url);
    const q = url.searchParams.get("q")?.trim() ?? "";
    const localeParam = url.searchParams.get("locale")?.trim() ?? "";
    const locale = localeParam || DEFAULT_LOCALE;

    let query = client
      .from("content_blocks")
      .select("id, key, locale, markdown, is_published, updated_at, updated_by")
      .order("key", { ascending: true })
      .order("locale", { ascending: true });

    if (locale) {
      query = query.eq("locale", locale);
    }

    if (q) {
      query = query.or(`key.ilike.%${q}%,markdown.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const items = data ?? [];

    const ensureFallback = (
      key: string,
      markdown: string,
      fallbackLocale: string,
    ) => {
      const exists = items.some(
        (row) => row.key === key && row.locale === fallbackLocale,
      );

      if (!exists) {
        const qValue = q.toLowerCase();
        const shouldInclude =
          !qValue ||
          key.toLowerCase().includes(qValue) ||
          markdown.toLowerCase().includes(qValue);

        if (shouldInclude) {
          items.push({
            id: `fallback:${key}:${fallbackLocale}`,
            key,
            locale: fallbackLocale,
            markdown,
            is_published: true,
            updated_at: null,
            updated_by: null,
          });
        }
      }
    };

    ensureFallback(
      "home.content",
      JSON.stringify(getHomeContentFallback(locale as Locale), null, 2),
      locale,
    );

    ensureFallback(
      "marketing.content",
      JSON.stringify(getContent(locale as Locale), null, 2),
      locale,
    );

    items.sort((a, b) => {
      const keySort = a.key.localeCompare(b.key);
      if (keySort !== 0) return keySort;
      return a.locale.localeCompare(b.locale);
    });

    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}

const PutSchema = z
  .object({
    key: z.string().min(1),
    locale: z.string().min(2).max(10).default("en"),
    markdown: z.string(),
    is_published: z.boolean().optional().default(true),
  })
  .strict();

export async function PUT(req: Request) {
  try {
    const { user, supabase, adminClient } = await assertAdminForAction();
    const client = adminClient ?? supabase;

    const ip = getIp(req);
    const rl = rateLimitSlidingWindow({
      key: `admin:content:put:${user.id}:${ip}`,
      limit: 60,
      windowMs: 60_000,
    });
    if (!rl.ok) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = PutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { data, error } = await client
      .from("content_blocks")
      .upsert(
        {
          key: parsed.data.key,
          locale: parsed.data.locale,
          markdown: parsed.data.markdown,
          is_published: parsed.data.is_published,
          updated_by: user.id,
        },
        { onConflict: "key,locale" },
      )
      .select("id, key, locale, markdown, is_published, updated_at, updated_by")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAdminAuditLog({
      client,
      adminUserId: user.id,
      action: "content.upsert",
      targetType: "content_block",
      targetId: `${parsed.data.key}:${parsed.data.locale}`,
      payload: {
        key: parsed.data.key,
        locale: parsed.data.locale,
        is_published: parsed.data.is_published,
      },
    });

    return NextResponse.json({ item: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Not authorized" },
      { status: 403 },
    );
  }
}
