"use client";

import { useMemo, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTranslations } from "@/i18n/client";

export default function CaptchaField() {
  const t = useTranslations();
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? "";
  const [token, setToken] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  const isConfigured = useMemo(() => siteKey.trim().length > 0, [siteKey]);

  if (!isConfigured) {
    return <input type="hidden" name="captchaToken" value="" />;
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="captchaToken" value={token} />
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <HCaptcha
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
