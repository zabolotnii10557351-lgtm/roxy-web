import { requireUserAndWorkspace } from "@/lib/workspace/server";

export const runtime = "nodejs";

function encodeEvent(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function GET(req: Request) {
  const { supabase, workspaceId } = await requireUserAndWorkspace();
  const url = new URL(req.url);
  const connectorId = url.searchParams.get("connectorId");
  const characterId = url.searchParams.get("characterId");
  let cursor = url.searchParams.get("after");

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encodeEvent({ type: "hello" }));

      const poll = async () => {
        let query = supabase
          .from("connector_events")
          .select("id, connector_id, character_id, event_type, payload, created_at")
          .eq("workspace_id", workspaceId)
          .order("created_at", { ascending: true })
          .limit(50);

        if (connectorId) query = query.eq("connector_id", connectorId);
        if (characterId) query = query.eq("character_id", characterId);
        if (cursor) query = query.gt("created_at", cursor);

        const { data, error } = await query;
        if (error) {
          controller.enqueue(encodeEvent({ type: "error", message: error.message }));
          return;
        }

        const events = Array.isArray(data) ? data : [];
        for (const event of events) {
          controller.enqueue(encodeEvent({ type: "event", event }));
          cursor = event.created_at;
        }
      };

      const interval = setInterval(() => void poll(), 2000);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        controller.enqueue(encodeEvent({ type: "bye" }));
        controller.close();
      }, 25_000);

      // initial poll
      await poll();

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    },
  });
}