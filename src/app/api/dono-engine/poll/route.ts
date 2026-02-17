import { NextRequest, NextResponse } from "next/server";
import { requireUserAndWorkspace } from "@/lib/workspace/server";

/**
 * GET /api/dono-engine/poll?limit=<n>
 *
 * Called by Runtime Connector page every 2s.
 * Returns pending dono_reaction events (exactly-once delivery).
 * Events are atomically marked as processed — no duplicates.
 *
 * Response shape:
 * {
 *   items: [
 *     {
 *       id: string,
 *       ruleId: string,
 *       firedAt: string,
 *       reaction: { text, emotionTag, actions[] },
 *       sender: { userId?, userName?, platform? },
 *       gift: { giftId?, giftName?, amount? }
 *     }
 *   ],
 *   cursor: string  // kept for backward compat (not used for polling anymore)
 * }
 */
export async function GET(req: NextRequest) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? "20"), 50);

  // Atomically consume pending events (marks them processed_at = NOW())
  const { data: events, error } = await supabase.rpc("consume_connector_events", {
    p_workspace_id: workspaceId,
    p_event_type: "dono_reaction",
    p_limit: limit,
  });

  if (error) {
    // Fallback: if RPC not available, use old method
    console.error("consume_connector_events RPC failed, falling back:", error.message);
    return fallbackPoll(req, supabase, workspaceId, limit);
  }

  type EventRow = { id: string; payload: Record<string, unknown> | null; created_at: string };

  const items = ((events ?? []) as EventRow[]).map((e) => {
    const p = e.payload;
    return {
      id: e.id,
      ruleId: (p?.ruleId as string) ?? null,
      firedAt: e.created_at,
      reaction: p?.reaction ?? null,
      sender: p?.sender ?? null,
      gift: p?.gift ?? null,
    };
  });

  const cursor = items.length > 0 ? items[items.length - 1].firedAt : new Date().toISOString();

  return NextResponse.json({ items, cursor });
}

/** Fallback: old cursor-based poll (in case RPC is not yet deployed) */
async function fallbackPoll(
  req: NextRequest,
  supabase: ReturnType<typeof import("@supabase/supabase-js").createClient>,
  workspaceId: string,
  limit: number
) {
  const since = req.nextUrl.searchParams.get("since") ?? new Date(Date.now() - 30_000).toISOString();

  const { data: events, error } = await supabase
    .from("connector_events")
    .select("id, payload, created_at")
    .eq("workspace_id", workspaceId)
    .eq("event_type", "dono_reaction")
    .gt("created_at", since)
    .is("processed_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  type EventRow = { id: string; payload: Record<string, unknown> | null; created_at: string };

  const items = ((events ?? []) as EventRow[]).map((e) => {
    const p = e.payload;
    return {
      id: e.id,
      ruleId: (p?.ruleId as string) ?? null,
      firedAt: e.created_at,
      reaction: p?.reaction ?? null,
      sender: p?.sender ?? null,
      gift: p?.gift ?? null,
    };
  });

  // Mark as processed
  if (items.length > 0) {
    await supabase
      .from("connector_events")
      .update({ processed_at: new Date().toISOString() })
      .in("id", items.map((i) => i.id));
  }

  const cursor = items.length > 0 ? items[items.length - 1].firedAt : since;
  return NextResponse.json({ items, cursor });
}
