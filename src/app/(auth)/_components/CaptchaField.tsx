"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useFormStatus } from "react-dom";
import { useTranslations } from "@/i18n/client";

export default function CaptchaField() {
  const t = useTranslations();
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? "";
  const [token, setToken] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const captchaRef = useRef<HCaptcha | null>(null);
  const { pending } = useFormStatus();
  const prevPendingRef = useRef(false);

  const isConfigured = useMemo(() => siteKey.trim().length > 0, [siteKey]);

  useEffect(() => {
    if (!isConfigured) return;

    const prevPending = prevPendingRef.current;
    prevPendingRef.current = pending;

    if (prevPending && !pending) {
      setToken("");
      setHasError(false);
      captchaRef.current?.resetCaptcha();
    }
  }, [isConfigured, pending]);

  if (!isConfigured) {
    return <input type="hidden" name="captchaToken" value="" />;
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="captchaToken" value={token} />
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onVerify={(value) => {
            setToken(value);
            setHasError(false);
          }}
          onExpire={() => setToken("")}
          onError={() => {
            setToken("");
            setHasError(true);
          }}
          theme="dark"
        />
      </div>

      <p className="text-xs text-white/50">We use hCaptcha to protect the service from abuse.</p>

      {hasError ? (
        <p className="text-xs text-rose-200">
          {t.auth.captchaError}
        </p>
      ) : null}
    </div>
  );
}
