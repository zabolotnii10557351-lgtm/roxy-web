import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { DonoRuleConfigSchema, DonoRuleRowSchema } from "@/lib/schemas/workspace";

const BodySchema = z
  .object({
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    provider: z.enum(["tiktok", "twitch", "youtube"]),
    eventType: z.enum(["gift", "likes", "reposts", "subscribe", "follow"]).optional(),
    giftId: z.string().min(1).optional(),
    giftName: z.string().min(1).optional(),
    amount: z.coerce.number().int().min(1).optional(),
    likes: z.coerce.number().int().min(1).optional(),
    reposts: z.coerce.number().int().min(1).optional(),
    count: z.coerce.number().int().min(1).optional(),
    sender: z.string().optional(),
  })
  .strict();

function normalizeGiftKey(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\s_-]+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

async function isWithinCooldown(params: {
  supabase: Awaited<ReturnType<typeof requireUserAndWorkspace>>["supabase"];
  workspaceId: string;
  ruleId: string;
  cooldownSeconds: number;
}) {
  if (params.cooldownSeconds <= 0) return false;

  const { data, error } = await params.supabase
    .from("connector_events")
    .select("created_at")
    .eq("workspace_id", params.workspaceId)
    .eq("event_type", "dono_reaction")
    .contains("payload", { ruleId: params.ruleId })
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return false;

  const lastAt = new Date(data[0].created_at as string).getTime();
  return Date.now() - lastAt < params.cooldownSeconds * 1000;
}

export async function POST(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const json = (await req.json().catch(() => null)) as unknown;
  const parsed = BodySchema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const eventType = parsed.data.eventType ?? "gift";
  const amount = parsed.data.amount ?? parsed.data.count ?? 1;
  const likes = parsed.data.likes ?? parsed.data.count ?? 1;
  const reposts = parsed.data.reposts ?? parsed.data.count ?? 1;
  const giftId = parsed.data.giftId ?? "";
  const giftName = parsed.data.giftName ?? "";

  const { data: rules, error } = await supabase
    .from("dono_rules")
    .select("id, workspace_id, name, config, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const parsedRules = (rules ?? [])
    .map((row) => DonoRuleRowSchema.safeParse(row))
    .filter((result): result is z.SafeParseSuccess<z.infer<typeof DonoRuleRowSchema>> => result.success)
    .map((result) => result.data)
    .map((rule) => ({
      ...rule,
      config: DonoRuleConfigSchema.parse(rule.config ?? {}),
    }))
    .filter((rule) => rule.config.enabled)

    .filter((rule) => {
      const trigger = rule.config.trigger as Record<string, unknown>;
      const triggerType = trigger.type;

      if (eventType === "gift") {
        if (triggerType !== "gift") return false;
        const t = trigger as { giftId?: unknown; minAmount?: unknown };
        if (typeof t.giftId !== "string" || t.giftId.length === 0) return false;
        if (giftId.length === 0 && giftName.length === 0) return false;
        const minAmount = typeof t.minAmount === "number" ? t.minAmount : 1;

        const ruleKey = normalizeGiftKey(t.giftId);

        const incomingKeys = new Set(
          [giftId, giftName]
            .filter((v) => typeof v === "string" && v.trim().length > 0)
            .map((v) => normalizeGiftKey(v))
            .filter((k) => k.length > 0),
        );

        return ruleKey.length > 0 && incomingKeys.has(ruleKey) && amount >= minAmount;
      }

      if (eventType === "likes") {
        if (triggerType !== "likes") return false;
        const minLikes = typeof (trigger as { minLikes?: unknown }).minLikes === "number"
          ? ((trigger as { minLikes: number }).minLikes ?? 1)
          : 1;
        return likes >= minLikes;
      }

      if (eventType === "reposts") {
        if (triggerType !== "reposts") return false;
        const minReposts = typeof (trigger as { minReposts?: unknown }).minReposts === "number"
          ? ((trigger as { minReposts: number }).minReposts ?? 1)
          : 1;
        return reposts >= minReposts;
      }

      if (eventType === "subscribe") {
        if (triggerType !== "subscribe") return false;
        const minCount = typeof (trigger as { minCount?: unknown }).minCount === "number"
          ? ((trigger as { minCount: number }).minCount ?? 1)
          : 1;
        return amount >= minCount;
      }

      if (eventType === "follow") {
        if (triggerType !== "follow") return false;
        const minCount = typeof (trigger as { minCount?: unknown }).minCount === "number"
          ? ((trigger as { minCount: number }).minCount ?? 1)
          : 1;
        return amount >= minCount;
      }

      return false;
    });

  const sorted = parsedRules.sort((a, b) => {
    const aTrigger = a.config.trigger as Record<string, unknown>;
    const bTrigger = b.config.trigger as Record<string, unknown>;

    const aThreshold =
      typeof aTrigger.minAmount === "number"
        ? aTrigger.minAmount
        : typeof aTrigger.minLikes === "number"
          ? aTrigger.minLikes
          : typeof aTrigger.minReposts === "number"
            ? aTrigger.minReposts
            : typeof aTrigger.minCount === "number"
              ? aTrigger.minCount
              : 1;

    const bThreshold =
      typeof bTrigger.minAmount === "number"
        ? bTrigger.minAmount
        : typeof bTrigger.minLikes === "number"
          ? bTrigger.minLikes
          : typeof bTrigger.minReposts === "number"
            ? bTrigger.minReposts
            : typeof bTrigger.minCount === "number"
              ? bTrigger.minCount
              : 1;

    const amountDiff = bThreshold - aThreshold;
    if (amountDiff !== 0) return amountDiff;
    return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
  });

  for (const rule of sorted) {
    const cooldownSeconds = rule.config.cooldownSeconds ?? 0;
    const coolingDown = await isWithinCooldown({
      supabase,
      workspaceId,
      ruleId: rule.id,
      cooldownSeconds,
    });

    if (coolingDown) continue;

    const payload = {
      ruleId: rule.id,
      eventType,
      giftId: eventType === "gift" ? giftId : null,
      giftName: eventType === "gift" ? giftName : null,
      amount: eventType === "gift" ? amount : null,
      likes: eventType === "likes" ? likes : null,
      reposts: eventType === "reposts" ? reposts : null,
      sender: parsed.data.sender ?? null,
      provider: parsed.data.provider,
      reaction: rule.config.reaction,
    };

    const { error: insertError } = await supabase
      .from("connector_events")
      .insert({
        workspace_id: workspaceId,
        connector_id: parsed.data.connectorId ?? null,
        character_id: parsed.data.characterId ?? null,
        event_type: "dono_reaction",
        payload,
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ matched: true, ruleId: rule.id, payload });
  }

  return NextResponse.json({ matched: false });
}