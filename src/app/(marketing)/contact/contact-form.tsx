"use client";

import { useState } from "react";
import Button from "@/components/Button";

type Labels = {
  name: string;
  topic: string;
  topicOptions: string[];
  email: string;
  message: string;
  sendRequest: string;
  sending: string;
  success: string;
};

export default function ContactForm(props: {
  labels: Labels;
  initialTopic?: string;
  initialMessage?: string;
  initialEmail?: string;
}) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(
    props.initialTopic && props.labels.topicOptions.includes(props.initialTopic)
      ? props.initialTopic
      : props.labels.topicOptions[0] ?? "Support"
  );
  const [email, setEmail] = useState(props.initialEmail ?? "");
  const [message, setMessage] = useState(props.initialMessage ?? "");
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
          first_name: name,
          last_name: "",
          message,
          topic,
          source: "marketing_contact",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Submission failed");
      }

      setStatus({ type: "ok" });
      setName("");
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
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40"
        placeholder={props.labels.name}
      />

      <div className="mt-4">
        <label className="sr-only">{props.labels.topic}</label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
        >
          {props.labels.topicOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0A0F1A]">
              {opt}
            </option>
          ))}
        </select>
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
        {busy ? props.labels.sending : props.labels.sendRequest}
      </Button>

      {status.type === "ok" ? (
        <p className="mt-4 text-sm text-emerald-200">{props.labels.success}</p>
      ) : null}

      {status.type === "error" ? (
        <p className="mt-4 text-sm text-rose-200">{status.message}</p>
      ) : null}
    </div>
  );
}
