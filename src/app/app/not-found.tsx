import Link from "next/link";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";

export default async function NotFound() {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  return (
    <div className="glass-card mx-auto mt-24 max-w-xl rounded-3xl p-10 text-center">
      <h2 className="text-2xl font-semibold text-white">{t.app.notFoundTitle}</h2>
      <p className="mt-3 text-sm text-white/70">
        {t.app.notFoundSubtitle}
      </p>
      <Link
        href="/app"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm text-white"
      >
        {t.app.backToOverview}
      </Link>
    </div>
  );
}
