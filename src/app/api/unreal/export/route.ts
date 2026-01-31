import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimitSlidingWindow } from "@/server/rateLimit";
import {
  CharacterConfigSchema,
  CharacterRowSchema,
  DonoRuleRowSchema,
  StreamScriptRowSchema,
  SceneRowSchema,
} from "@/lib/schemas/workspace";

const BodySchema = z
  .object({
    characterId: z.string().uuid(),
    includeDonoRules: z.boolean().optional().default(true),
    includeScripts: z.boolean().optional().default(true),
    includeScenes: z.boolean().optional().default(false),
  })
  .strict();

function safeFilePart(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_\-]/g, "")
    .slice(0, 40);
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rl = rateLimitSlidingWindow({
    key: `unreal:export:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const raw = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { characterId, includeDonoRules, includeScripts, includeScenes } = parsed.data;

  const { data: characterRow, error: characterError } = await supabase
    .from("characters")
    .select("id, workspace_id, name, config, created_at")
    .eq("id", characterId)
    .maybeSingle();

  if (characterError) {
    return NextResponse.json({ error: characterError.message }, { status: 500 });
  }

  if (!characterRow) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  const character = CharacterRowSchema.parse(characterRow);
  const config = CharacterConfigSchema.parse(character.config ?? {});

  const [donoRules, scripts, scenes] = await Promise.all([
    includeDonoRules
      ? supabase
          .from("dono_rules")
          .select("id, workspace_id, name, config, created_at")
          .eq("workspace_id", character.workspace_id)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
    includeScripts
      ? supabase
          .from("stream_scripts")
          .select("id, workspace_id, name, config, created_at")
          .eq("workspace_id", character.workspace_id)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
    includeScenes
      ? supabase
          .from("scenes")
          .select("id, workspace_id, name, config, created_at")
          .eq("workspace_id", character.workspace_id)
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (donoRules?.error) {
    return NextResponse.json({ error: donoRules.error.message }, { status: 500 });
  }
  if (scripts?.error) {
    return NextResponse.json({ error: scripts.error.message }, { status: 500 });
  }
  if (scenes?.error) {
    return NextResponse.json({ error: scenes.error.message }, { status: 500 });
  }

  const exportPayload = {
    schemaVersion: 1,
    characterId: character.id,
    name: character.name,
    language: config.language?.primary ?? "en",
    persona: {
      displayName: config.profile?.displayName ?? "",
      bio: config.profile?.bio ?? "",
      goals: config.profile?.goals ?? "",
      safetyRules: config.safety?.rules ?? [],
      streamBehavior: config.streamBehavior ?? {},
    },
    voice: {
      provider: config.voice?.provider ?? "openai_included",
      voiceId: config.voice?.voiceId ?? "",
      style: config.voice?.style ?? {},
    },
    donoRules: includeDonoRules
      ? (Array.isArray(donoRules.data) ? donoRules.data.map((r: unknown) => DonoRuleRowSchema.parse(r)) : [])
      : undefined,
    scripts: includeScripts
      ? (Array.isArray(scripts.data) ? scripts.data.map((r: unknown) => StreamScriptRowSchema.parse(r)) : [])
      : undefined,
    scenes: includeScenes
      ? (Array.isArray(scenes.data) ? scenes.data.map((r: unknown) => SceneRowSchema.parse(r)) : [])
      : undefined,
    createdAt: character.created_at ?? new Date().toISOString(),
    instructions: {
      unreal:
        "Use this config with RoxStreamAI Unreal Connector (coming soon). For now, map emotions/events manually.",
    },
  };

  const namePart = safeFilePart(character.name) || "character";
  const filename = `rox_character_${namePart}_${character.id}.json`;

  return new NextResponse(JSON.stringify(exportPayload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
      "Cache-Control": "no-store",
    },
  });
}
