"use client";

import { useState } from "react";
import Button from "@/components/Button";

type Labels = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  sendRequest: string;
};

export default function ContactForm(props: {
  labels: Labels;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "ok" }
    | { type: "error"; message: string }
  >({ type: "idle" });

  async function submit() {
    setBusy(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          message,
          source: "marketing_contact",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Submission failed");
      }

      setStatus({ type: "ok" });
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setStatus({ type: "error", message: e instanceof Error ? e.message : "Submission failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
          placeholder={props.labels.firstName}
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
          placeholder={props.labels.lastName}
        />
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
        placeholder={props.labels.email}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
        placeholder={props.labels.message}
        rows={4}
      />

      <Button
        className="mt-6 w-full"
        onClick={() => void submit()}
        disabled={busy || !email.trim() || !message.trim()}
      >
        {busy ? "Sending…" : props.labels.sendRequest}
      </Button>

      {status.type === "ok" ? (
        <p className="mt-4 text-sm text-emerald-200">
          Thanks — message received.
        </p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-rose-200">{status.message}</p>
      ) : null}
    </div>
  );
}
