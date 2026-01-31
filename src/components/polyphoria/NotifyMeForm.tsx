"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function NotifyMeForm(props: {
  tag: "polyphoria" | "unreal_runtime";
  ctaText?: string;
  defaultEmail?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState(props.defaultEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (email.trim()) return;
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (user?.email) setEmail(user.email);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    setBusy(true);
    setMessage(null);

    const res = await fetch("/api/leads/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: props.tag }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      setMessage(json?.error ?? "Failed to join waitlist.");
      setBusy(false);
      return;
    }

    setMessage("Thanks — we’ll notify you.");
    setBusy(false);
  };

  return (
    <div className={props.compact ? "flex flex-col gap-2" : "space-y-3"}>
      <div className={props.compact ? "flex gap-2" : "flex flex-col gap-2 sm:flex-row"}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          placeholder="you@example.com"
        />
        <Button
          variant="secondary"
          onClick={submit}
          disabled={busy || !email.trim()}
        >
          {busy ? "Sending…" : props.ctaText ?? "Notify me"}
        </Button>
      </div>

      {message ? (
        <p className="text-xs text-white/70">{message}</p>
      ) : null}
    </div>
  );
}
