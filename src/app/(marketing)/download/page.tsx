import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getContent } from "@/i18n/content";
import { getLocaleFromRequest } from "@/i18n/server";
import { redirect } from "next/navigation";

interface ReleaseRow {
  id: number;
  version: string;
  platform: string;
  url: string;
  notes: string | null;
  is_latest: boolean | null;
  created_at: string;
}

export default async function DownloadPage() {
  const locale = await getLocaleFromRequest();
  const content = getContent(locale);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: releases } = await supabase
    .from("releases")
    .select("id, version, platform, url, notes, is_latest, created_at")
    .order("created_at", { ascending: false });

  const latestByPlatform = (releases ?? []).reduce<Record<string, ReleaseRow>>(
    (acc, release) => {
      const key = release.platform;
      if (!acc[key] || release.is_latest) {
        acc[key] = release;
      }
      return acc;
    },
    {}
  );

  return (
    <Container className="py-20 space-y-10">
      <SectionHeading
        eyebrow={content.download.eyebrow}
        title={content.download.title}
        subtitle={content.download.subtitle}
      />

      {releases && releases.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Object.values(latestByPlatform).map((release) => (
            <div
              key={release.id}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {release.platform.toUpperCase()} • v{release.version}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {content.download.latestLabel} {release.platform === "win" ? "Windows" : "macOS"} build
                </p>
                {release.notes ? (
                  <p className="mt-2 text-sm text-white/70 whitespace-pre-line">
                    {release.notes}
                  </p>
                ) : null}
              </div>
              <Button href={release.url}>{content.download.download}</Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-6 text-white/70">
          <p className="text-sm">
            {content.download.noReleases}
          </p>
          <div className="mt-4">
            <Button href="/admin/releases" variant="secondary">
              {content.download.openAdmin}
            </Button>
          </div>
        </div>
      )}

      {releases && releases.length > 0 ? (
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {content.download.releaseHistory}
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            {releases.map((release) => (
              <div
                key={release.id}
                className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">
                    {release.platform.toUpperCase()} v{release.version}
                  </span>
                  <a
                    className="text-cyan-300 hover:text-cyan-200"
                    href={release.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.download.download}
                  </a>
                </div>
                {release.notes ? (
                  <span className="text-white/60 whitespace-pre-line">
                    {release.notes}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Container>
  );
}
