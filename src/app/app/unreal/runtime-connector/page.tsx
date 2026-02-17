"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { useTranslations } from "@/i18n/client";

// —— Types ——

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

type UnrealState = {
  mode?: string;
  selectedSceneId?: string;
  selectedMapId?: string;
  selectedMetaHumanId?: string;
  backgroundId?: string;
  liveLinkEnabled?: boolean;
  liveLinkSubject?: string;
};

type PollItem = {
  id: string;
  ruleId: string | null;
  firedAt: string;
  reaction: {
    text: string;
    emotionTag: string;
    actions: Array<
      | { type: "play_animation"; animationId: string; gender: string; label: string }
      | { type: "unreal_trigger"; triggerName: string; duration?: number }
    >;
  } | null;
  sender: { userId?: string; userName?: string; platform?: string } | null;
  gift: { giftId?: string; giftName?: string; amount?: number } | null;
};

type LogEntry = {
  ts: string;
  level: "info" | "warn" | "error" | "success";
  msg: string;
};

// —— Constants ——

const DEFAULT_WS_URL = "ws://127.0.0.1:8787";
const POLL_INTERVAL_MS = 2000;
const MAX_LOG_ENTRIES = 100;

// —— Helpers ——

let _reqId = 0;
function nextReqId() {
  return `web-${Date.now()}-${++_reqId}`;
}

// —— Component ——

export default function RuntimeConnectorPage() {
  const t = useTranslations();

  // Connection
  const [wsUrl, setWsUrl] = useState(DEFAULT_WS_URL);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [unrealState, setUnrealState] = useState<UnrealState | null>(null);
  const [serverInfo, setServerInfo] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Polling
  const [polling, setPolling] = useState(false);
  const [pollCursor, setPollCursor] = useState<string | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Relay stats
  const [relayCount, setRelayCount] = useState(0);
  const [lastRelayed, setLastRelayed] = useState<string | null>(null);

  // Log
  const [log, setLog] = useState<LogEntry[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((level: LogEntry["level"], msg: string) => {
    setLog((prev) => {
      const next = [...prev, { ts: new Date().toISOString(), level, msg }];
      return next.length > MAX_LOG_ENTRIES ? next.slice(-MAX_LOG_ENTRIES) : next;
    });
  }, []);

  // Auto-scroll log
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  // —— WebSocket to Unreal ——

  const connectWs = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setStatus("connecting");
    addLog("info", `Connecting to ${wsUrl}…`);

    const ws = new WebSocket(wsUrl);
    ws.binaryType = "blob";
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      addLog("success", "WebSocket connected");

      // Send hello
      ws.send(JSON.stringify({
        type: "hello",
        requestId: nextReqId(),
        data: { client: "RoxStreamAI-Web", version: "1.0.0" },
      }));
    };

    ws.onmessage = async (evt) => {
      try {
        const raw = typeof evt.data === "string" ? evt.data : await evt.data.text();
        const msg = JSON.parse(raw);

        if (msg.type === "response" && msg.data?.state) {
          setUnrealState(msg.data.state);
          setServerInfo(msg.data.server ? `${msg.data.server} v${msg.data.version}` : null);
        }

        if (msg.type === "event" && msg.event === "stateChanged") {
          setUnrealState(msg.data);
        }

        if (msg.type === "event" && msg.event === "triggerFired") {
          addLog("success", `Trigger fired: ${msg.data?.triggerId} (${msg.data?.status})`);
        }

        // Don't log heartbeats
        if (msg.type === "event" && msg.event === "serverHeartbeat") return;

        addLog("info", `← ${msg.type}: ${msg.event ?? msg.requestId ?? ""}`);
      } catch {
        addLog("warn", `← non-JSON: ${evt.data.slice(0, 100)}`);
      }
    };

    ws.onerror = () => {
      addLog("error", "WebSocket error");
      setStatus("error");
    };

    ws.onclose = (e) => {
      addLog("warn", `WebSocket closed (code ${e.code})`);
      setStatus("disconnected");
      wsRef.current = null;
    };
  }, [wsUrl, addLog]);

  const disconnectWs = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setStatus("disconnected");
    setUnrealState(null);
    setServerInfo(null);
    addLog("info", "Disconnected");
  }, [addLog]);

  // —— Send executeTrigger to Unreal ——

  const sendTrigger = useCallback(
    (item: PollItem) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        addLog("error", "Cannot relay — WebSocket not connected");
        return false;
      }

      const actions = item.reaction?.actions ?? [];

      for (const action of actions) {
        if (action.type === "unreal_trigger") {
          const name = action.triggerName;

          // BG_* → use setBackground command (separate from executeTrigger)
          if (name.startsWith("BG_")) {
            const bgId = name.replace("BG_", "");
            const payload = {
              type: "setBackground",
              requestId: nextReqId(),
              data: { backgroundId: bgId },
            };
            ws.send(JSON.stringify(payload));
            addLog("success", `→ setBackground: ${bgId}`);
          } else {
            // NS_* and AD_* → executeTrigger
            const payload = {
              type: "executeTrigger",
              requestId: nextReqId(),
              data: {
                triggerId: name,
                duration: (action as any).duration,
                amount: item.gift?.amount,
                userId: item.sender?.userId,
                userName: item.sender?.userName,
                platform: item.sender?.platform,
                giftId: item.gift?.giftId,
                message: item.reaction?.text,
              },
            };
            ws.send(JSON.stringify(payload));
            addLog("success", `→ executeTrigger: ${name}`);
          }
        }

        if (action.type === "play_animation") {
          // For animations, we use executeTrigger with the animation ID
          // BP_RoxBridge handles routing based on the triggerId prefix (AD_ = animation, NS_ = VFX)
          const payload = {
            type: "executeTrigger",
            requestId: nextReqId(),
            data: {
              triggerId: action.animationId,
              amount: item.gift?.amount,
              userId: item.sender?.userId,
              userName: item.sender?.userName,
              platform: item.sender?.platform,
              giftId: item.gift?.giftId,
              message: item.reaction?.text,
            },
          };
          ws.send(JSON.stringify(payload));
          addLog("success", `→ executeTrigger (anim): ${action.animationId}`);
        }
      }

      return true;
    },
    [addLog],
  );

  // —— Poll /api/dono-engine/poll ——

  const doPoll = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: "10" });
      if (pollCursor) params.set("since", pollCursor);

      const res = await fetch(`/api/dono-engine/poll?${params}`);
      if (!res.ok) {
        addLog("error", `Poll failed: ${res.status}`);
        return;
      }

      const json = await res.json();
      const items: PollItem[] = json.items ?? [];

      if (json.cursor) setPollCursor(json.cursor);

      if (items.length === 0) return;

      addLog("info", `Poll: ${items.length} new reaction(s)`);

      // Relay each to Unreal
      for (const item of items) {
        if (!item.reaction?.actions?.length) continue;

        const ok = sendTrigger(item);
        if (ok) {
          setRelayCount((c) => c + 1);
          setLastRelayed(item.reaction?.actions?.map((a) =>
            a.type === "unreal_trigger" ? a.triggerName : (a as { animationId: string }).animationId
          ).join(", ") ?? null);
        }
      }
    } catch (err) {
      addLog("error", `Poll error: ${err}`);
    }
  }, [pollCursor, sendTrigger, addLog]);

  const startPolling = useCallback(() => {
    if (pollTimerRef.current) return;
    setPolling(true);
    setPollCursor(new Date().toISOString()); // start from now
    addLog("info", "Polling started");
    pollTimerRef.current = setInterval(doPoll, POLL_INTERVAL_MS);
    doPoll(); // immediate first poll
  }, [doPoll, addLog]);

  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    setPolling(false);
    addLog("info", "Polling stopped");
  }, [addLog]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  // —— Status indicator ——
  const statusColor: Record<ConnectionStatus, string> = {
    disconnected: "bg-white/20",
    connecting: "bg-yellow-400 animate-pulse",
    connected: "bg-green-400",
    error: "bg-red-400",
  };

  // —— Render ——

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Runtime Connector</h2>
        <p className="text-sm text-white/60">
          Bridge between donation events and Unreal Engine via WebSocket
        </p>
      </div>

      {/* Connection Panel */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${statusColor[status]}`} />
          <h3 className="text-lg font-semibold text-white">
            Unreal Connection
            {serverInfo && <span className="ml-2 text-sm font-normal text-white/50">{serverInfo}</span>}
          </h3>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-1 block text-[11px] font-medium text-white/70">WebSocket URL</label>
            <input
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              disabled={status === "connected"}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white disabled:opacity-50"
              placeholder="ws://localhost:8787"
            />
          </div>
          {status === "disconnected" || status === "error" ? (
            <Button onClick={connectWs}>Connect</Button>
          ) : status === "connecting" ? (
            <Button disabled>Connecting…</Button>
          ) : (
            <Button variant="ghost" onClick={disconnectWs}>Disconnect</Button>
          )}
        </div>

        {/* Unreal state summary */}
        {unrealState && (
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-xs text-white/60 space-y-1">
            <p><span className="text-white/40">Mode:</span> {unrealState.mode ?? "—"}</p>
            <p><span className="text-white/40">Scene:</span> {unrealState.selectedSceneId ?? "—"}</p>
            <p><span className="text-white/40">Map:</span> {unrealState.selectedMapId ?? "—"}</p>
            <p><span className="text-white/40">MetaHuman:</span> {unrealState.selectedMetaHumanId ?? "—"}</p>
            <p><span className="text-white/40">Background:</span> {unrealState.backgroundId ?? "—"}</p>
            <p><span className="text-white/40">LiveLink:</span> {unrealState.liveLinkEnabled ? `ON (${unrealState.liveLinkSubject})` : "OFF"}</p>
          </div>
        )}
      </div>

      {/* Relay Panel */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Donation Relay</h3>
            <p className="text-xs text-white/50">
              Polls /api/dono-engine/poll every {POLL_INTERVAL_MS / 1000}s → relays to Unreal via executeTrigger
            </p>
          </div>
          <div className="text-right text-xs text-white/50">
            <p>Relayed: <span className="text-white font-mono">{relayCount}</span></p>
            {lastRelayed && <p>Last: <span className="text-green-400">{lastRelayed}</span></p>}
          </div>
        </div>

        <div className="flex gap-3">
          {!polling ? (
            <Button
              onClick={startPolling}
              disabled={status !== "connected"}
            >
              {status !== "connected" ? "Connect Unreal first" : "Start Relay"}
            </Button>
          ) : (
            <Button variant="ghost" onClick={stopPolling}>
              Stop Relay
            </Button>
          )}

          {/* Manual test trigger */}
          <Button
            variant="ghost"
            disabled={status !== "connected"}
            onClick={() => {
              const ws = wsRef.current;
              if (!ws || ws.readyState !== WebSocket.OPEN) return;
              ws.send(JSON.stringify({
                type: "executeTrigger",
                requestId: nextReqId(),
                data: { triggerId: "NS_Basic_Attract", amount: 1, userName: "TestUser", platform: "web" },
              }));
              addLog("info", "→ Test trigger: NS_Basic_Attract");
            }}
          >
            Test Trigger
          </Button>
        </div>
      </div>

      {/* Log Panel */}
      <div className="glass-card rounded-3xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Event Log</h3>
          <button
            onClick={() => setLog([])}
            className="text-xs text-white/40 hover:text-white/70 transition"
          >
            Clear
          </button>
        </div>

        <div
          ref={logRef}
          className="h-64 overflow-y-auto rounded-2xl border border-white/5 bg-black/30 p-3 font-mono text-xs leading-relaxed"
        >
          {log.length === 0 ? (
            <p className="text-white/25 text-center mt-20">No events yet. Connect to Unreal and start relay.</p>
          ) : (
            log.map((entry, i) => {
              const color =
                entry.level === "error" ? "text-red-400" :
                entry.level === "warn" ? "text-yellow-400" :
                entry.level === "success" ? "text-green-400" :
                "text-white/60";
              return (
                <div key={i} className={color}>
                  <span className="text-white/25">{entry.ts.slice(11, 19)}</span>{" "}
                  {entry.msg}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Data Flow</h3>
        <div className="rounded-2xl border border-white/5 bg-black/30 p-4 font-mono text-xs text-white/50 leading-loose">
          <p>TikTok/Twitch → POST /api/dono-engine/trigger → match rule → INSERT connector_events</p>
          <p className="text-white/30">{"                                                                    ↓"}</p>
          <p>This page polls GET /api/dono-engine/poll?since=cursor every {POLL_INTERVAL_MS / 1000}s</p>
          <p className="text-white/30">{"                                                                    ↓"}</p>
          <p>WebSocket → ws://localhost:8787 → executeTrigger → Unreal BP_RoxBridge → VFX/Animation</p>
        </div>
      </div>
    </div>
  );
}
