"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import SignOutButton from "@/components/SignOutButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useCurrentUserProfile } from "@/hooks/useCurrentUserProfile";
import { useCurrentWorkspace } from "@/hooks/useCurrentWorkspace";
import AiProvidersSettings from "@/app/app/settings/_components/AiProvidersSettings";
import { useTranslations } from "@/i18n/client";

export default function SettingsPage() {
  const t = useTranslations();
  const { profile, loading: profileLoading, error: profileError } =
    useCurrentUserProfile();
  const { workspace, loading: workspaceLoading, error: workspaceError } =
    useCurrentWorkspace();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.display_name ?? "");
    setUsername(profile.username ?? "");
  }, [profile]);

  const canSave = Boolean(displayName.trim().length > 0);

  const handleSave = async () => {
    if (!profile) return;
    if (!canSave) {
      setSaveError(t.app.settingsDisplayNameRequired);
      return;
    }

    setSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim(),
        username: username.trim().length > 0 ? username.trim() : null,
      })
      .eq("id", profile.id);

    if (error) {
      setSaveError(error.message);
      setSaving(false);
      return;
    }

    setSaveSuccess(t.common.saved);
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">{t.app.settingsPageTitle}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AiProvidersSettings />

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.settingsProfileTitle}</h3>

          {profileLoading ? (
            <p className="mt-4 text-sm text-white/60">{t.common.loading}</p>
          ) : profileError ? (
            <p className="mt-4 text-sm text-rose-200">{profileError}</p>
          ) : profile ? (
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {t.app.settingsDisplayNameLabel}
                </label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder="Lia"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {t.app.settingsUsernameOptionalLabel}
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                  placeholder="lia_streams"
                />
              </div>

              {saveError ? (
                <p className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {saveError}
                </p>
              ) : null}
              {saveSuccess ? (
                <p className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  {saveSuccess}
                </p>
              ) : null}

              <Button
                className="mt-2"
                onClick={handleSave}
                disabled={!canSave || saving}
                variant="secondary"
              >
                {saving ? t.common.saving : t.common.save}
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/60">{t.app.settingsNoProfileFound}</p>
          )}
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white">{t.app.settingsWorkspaceTitle}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            {workspaceLoading ? (
              <p className="text-white/60">{t.common.loading}</p>
            ) : workspaceError ? (
              <p className="text-rose-200">{workspaceError}</p>
            ) : workspace ? (
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                {workspace.name}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 px-4 py-3">
                {t.app.settingsNoWorkspaceFound}
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white">{t.app.settingsSignOutTitle}</h3>
            <p className="mt-2 text-sm text-white/60">
              {t.app.settingsSignOutDescription}
            </p>
            <SignOutButton className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
