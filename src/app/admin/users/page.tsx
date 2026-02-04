import { revalidatePath } from "next/cache";
import { getLocaleFromRequest, getTranslations } from "@/i18n/server";
import { assertAdminForAction, requireAdminUserOrNotFound } from "@/lib/auth";
import { writeAdminAuditLog } from "@/server/admin/audit";

type AdminUsersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function updateProfileAction(formData: FormData) {
  "use server";
  const { user, adminClient, supabase } = await assertAdminForAction();
  const client = adminClient ?? supabase;

  const id = formData.get("id")?.toString();
  const role = formData.get("role")?.toString();
  const planId = formData.get("plan_id")?.toString();

  if (!id || !role || !planId) {
    throw new Error("Missing profile fields");
  }

  const { error } = await client
    .from("profiles")
    .update({ role, plan_id: planId })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await writeAdminAuditLog({
    client,
    adminUserId: user.id,
    action: "users.update_profile",
    targetType: "profile",
    targetId: id,
    payload: { role, plan_id: planId },
  });

  revalidatePath("/admin/users");
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const locale = await getLocaleFromRequest();
  const t = getTranslations(locale);

  const resolvedParams = (await searchParams) ?? {};
  const qParam = resolvedParams.q;
  const pageParam = resolvedParams.page;
  const q = Array.isArray(qParam) ? qParam[0] ?? "" : qParam ?? "";
  const pageRaw = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const page = Math.max(1, Number(pageRaw ?? 1) || 1);
  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  const { supabase, adminClient } = await requireAdminUserOrNotFound();
  const client = adminClient ?? supabase;

  let query = client
    .from("profiles")
    .select("id, email, role, plan_id, created_at, username")
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize);

  if (q.trim().length > 0) {
    const safe = q.trim();
    query = query.or(`email.ilike.%${safe}%,username.ilike.%${safe}%`);
  }

  const { data: profileRows } = await query;
  const profiles = (profileRows ?? []).slice(0, pageSize);
  const hasNextPage = (profileRows ?? []).length > pageSize;

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    params.set("page", String(nextPage));
    return `/admin/users?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {t.admin.navUsers}
        </p>
        <h1 className="text-2xl font-semibold text-white">{t.admin.usersTitle}</h1>
        <p className="mt-2 text-sm text-white/60">{t.admin.usersSubtitle}</p>
      </div>

      <form className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder={t.admin.contentSearchPlaceholder}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        />
        <input type="hidden" name="page" value="1" />
        <button
          type="submit"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
        >
          {t.admin.buttonRefresh}
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="col-span-4">{t.admin.tableEmail}</span>
          <span className="col-span-2">{t.admin.tableRole}</span>
          <span className="col-span-2">{t.admin.tablePlan}</span>
          <span className="col-span-3">{t.admin.tableCreated}</span>
          <span className="col-span-1 text-right">{t.admin.tableSave}</span>
        </div>
        <div className="divide-y divide-white/5">
          {profiles.map((profile) => (
            <form
              key={profile.id}
              action={updateProfileAction}
              className="grid grid-cols-12 items-center gap-4 px-4 py-3 text-sm"
            >
              <input type="hidden" name="id" value={profile.id} />
              <span className="col-span-4 text-white/80">
                {profile.email ?? "—"}
              </span>
              <select
                name="role"
                defaultValue={profile.role ?? "user"}
                className="col-span-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white"
              >
                <option value="user">{t.admin.roleUser}</option>
                <option value="admin">{t.admin.roleAdmin}</option>
              </select>
              <select
                name="plan_id"
                defaultValue={profile.plan_id ?? "trial"}
                className="col-span-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white"
              >
                <option value="trial">{t.admin.planTrial}</option>
                <option value="pro">{t.admin.planPro}</option>
                <option value="studio">{t.admin.planStudio}</option>
                <option value="enterprise">{t.admin.planEnterprise}</option>
              </select>
              <span className="col-span-3 text-white/50">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString(locale)
                  : "—"}
              </span>
              <div className="col-span-1 flex justify-end">
                <button
                  type="submit"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
                >
                  {t.admin.buttonSave}
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/60">
        <div>
          Page {page}
        </div>
        <div className="flex items-center gap-2">
          {page > 1 ? (
            <a
              href={buildPageHref(page - 1)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
            >
              ←
            </a>
          ) : null}
          {hasNextPage ? (
            <a
              href={buildPageHref(page + 1)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
            >
              →
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
