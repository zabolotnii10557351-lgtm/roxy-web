"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Button from "@/components/Button";

interface AuthField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  description?: string;
  action: (state: { error?: string; success?: string }, formData: FormData) => Promise<{ error?: string; success?: string }>;
  submitLabel: string;
  fields: AuthField[];
  footer?: React.ReactNode;
  extraContent?: React.ReactNode;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Please wait..." : label}
    </Button>
  );
}

export default function AuthForm({
  title,
  description,
  action,
  submitLabel,
  fields,
  footer,
  extraContent,
}: AuthFormProps) {
  const [state, formAction] = useActionState(action, {});

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      {description ? (
        <p className="mt-2 text-sm text-white/60">{description}</p>
      ) : null}
      <form action={formAction} className="mt-6 space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required={field.required ?? true}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        ))}
        {extraContent}
        {state?.error ? (
          <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {state.error}
          </p>
        ) : null}
        {state?.success ? (
          <p className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {state.success}
          </p>
        ) : null}
        <SubmitButton label={submitLabel} />
      </form>
      {footer ? <div className="mt-6 text-sm text-white/60">{footer}</div> : null}
    </div>
  );
}
