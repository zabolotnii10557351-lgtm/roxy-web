import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { DonoRuleConfigSchema, DonoRuleRowSchema } from "@/lib/schemas/workspace";

const BodySchema = z
  .object({
    connectorId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    provider: z.enum(["tiktok", "twitch", "youtube"]),
    giftId: z.string().min(1),
    amount: z.coerce.number().int().min(1).default(1),
    sender: z.string().optional(),
  })
  .strict();

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

  const { giftId, amount } = parsed.data;

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
    .filter((rule) => rule.config.trigger.giftId === giftId)
    .filter((rule) => amount >= rule.config.trigger.minAmount);

  const sorted = parsedRules.sort((a, b) => {
    const amountDiff = b.config.trigger.minAmount - a.config.trigger.minAmount;
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
      giftId,
      amount,
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