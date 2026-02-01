import { revalidatePath } from "next/cache";
import { assertAdminForAction, requireAdminUserOrNotFound } from "@/lib/auth";
import { writeAdminAuditLog } from "@/server/admin/audit";

async function createReleaseAction(formData: FormData) {
  "use server";
  const { user, adminClient, supabase } = await assertAdminForAction();
  const client = adminClient ?? supabase;

  const version = formData.get("version")?.toString().trim();
  const platform = formData.get("platform")?.toString();
  const url = formData.get("url")?.toString().trim();
  const notes = formData.get("notes")?.toString().trim() ?? "";
  const isLatest = formData.get("is_latest") === "on";

  if (!version || !platform || !url) {
    throw new Error("Missing release fields");
  }

  if (isLatest) {
    await client
      .from("releases")
      .update({ is_latest: false })
      .eq("platform", platform);
  }

  const { error } = await client.from("releases").insert({
    version,
    platform,
    url,
    notes,
    is_latest: isLatest,
  });

  if (error) {
    throw new Error(error.message);
  }

  await writeAdminAuditLog({
    client,
    adminUserId: user.id,
    action: "releases.create",
    targetType: "release",
    targetId: `${platform}:${version}`,
    payload: { version, platform, url, is_latest: isLatest },
  });

  revalidatePath("/admin/releases");
}

async function updateReleaseAction(formData: FormData) {
  "use server";
  const { user, adminClient, supabase } = await assertAdminForAction();
  const client = adminClient ?? supabase;

  const id = formData.get("id")?.toString();
  const version = formData.get("version")?.toString().trim();
  const platform = formData.get("platform")?.toString();
  const url = formData.get("url")?.toString().trim();
  const notes = formData.get("notes")?.toString().trim() ?? "";
  const isLatest = formData.get("is_latest") === "on";

  if (!id || !version || !platform || !url) {
    throw new Error("Missing release fields");
  }

  if (isLatest) {
    await client
      .from("releases")
      .update({ is_latest: false })
      .eq("platform", platform);
  }

  const { error } = await client
    .from("releases")
    .update({ version, platform, url, notes, is_latest: isLatest })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await writeAdminAuditLog({
    client,
    adminUserId: user.id,
    action: "releases.update",
    targetType: "release",
    targetId: id,
    payload: { version, platform, url, is_latest: isLatest },
  });

  revalidatePath("/admin/releases");
}

async function deleteReleaseAction(formData: FormData) {
  "use server";
  const { user, adminClient, supabase } = await assertAdminForAction();
  const client = adminClient ?? supabase;

  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Missing release id");
  }

  const { error } = await client.from("releases").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await writeAdminAuditLog({
    client,
    adminUserId: user.id,
    action: "releases.delete",
    targetType: "release",
    targetId: id,
    payload: { id },
  });

  revalidatePath("/admin/releases");
}

export default async function AdminReleasesPage() {
  const { supabase, adminClient } = await requireAdminUserOrNotFound();
  const client = adminClient ?? supabase;

  const { data: releases } = await client
    .from("releases")
    .select("id, version, platform, url, notes, is_latest, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Releases
        </p>
        <h1 className="text-2xl font-semibold text-white">Manage builds</h1>
      </div>

      <form
        action={createReleaseAction}
        className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2"
      >
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">
            Version
          </label>
          <input
            name="version"
            required
            placeholder="1.0.0"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">
            Platform
          </label>
          <select
            name="platform"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            <option value="win">Windows</option>
            <option value="mac">macOS</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">
            Download URL
          </label>
          <input
            name="url"
            required
            placeholder="https://..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">
            Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            placeholder="What's new..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-white/70">
          <input
            type="checkbox"
            name="is_latest"
            className="h-4 w-4 rounded border-white/30 bg-white/5"
          />
          Mark as latest
        </label>
        <div className="flex items-center justify-end md:col-span-2">
          <button
            type="submit"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
          >
            Add release
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {(releases ?? []).map((release) => (
          <div
            key={release.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <form action={updateReleaseAction} className="grid gap-4 md:grid-cols-2">
              <input type="hidden" name="id" value={release.id} />
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Version
                </label>
                <input
                  name="version"
                  required
                  defaultValue={release.version}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Platform
                </label>
                <select
                  name="platform"
                  required
                  defaultValue={release.platform}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                >
                  <option value="win">Windows</option>
                  <option value="mac">macOS</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Download URL
                </label>
                <input
                  name="url"
                  required
                  defaultValue={release.url}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  defaultValue={release.notes ?? ""}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  name="is_latest"
                  defaultChecked={release.is_latest ?? false}
                  className="h-4 w-4 rounded border-white/30 bg-white/5"
                />
                Mark as latest
              </label>
              <div className="flex items-center justify-end gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
                >
                  Update
                </button>
              </div>
            </form>
            <form action={deleteReleaseAction} className="mt-4">
              <input type="hidden" name="id" value={release.id} />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.2em] text-rose-300 hover:text-rose-200"
              >
                Delete release
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
