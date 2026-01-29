import { revalidatePath } from "next/cache";
import { assertAdminForAction, requireAdminUser } from "@/lib/auth";

interface ProfileRow {
  id: string;
  email: string | null;
  role: string | null;
  plan_id: string | null;
  created_at: string | null;
}

async function updateProfileAction(formData: FormData) {
  "use server";
  const { adminClient, supabase } = await assertAdminForAction();
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

  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const { supabase, adminClient } = await requireAdminUser();
  const client = adminClient ?? supabase;

  const { data: profiles } = await client
    .from("profiles")
    .select("id, email, role, plan_id, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Users</p>
        <h1 className="text-2xl font-semibold text-white">Manage access</h1>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="col-span-4">Email</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2">Plan</span>
          <span className="col-span-3">Created</span>
          <span className="col-span-1 text-right">Save</span>
        </div>
        <div className="divide-y divide-white/5">
          {(profiles ?? []).map((profile) => (
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                name="plan_id"
                defaultValue={profile.plan_id ?? "trial"}
                className="col-span-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white"
              >
                <option value="trial">Trial</option>
                <option value="pro">Pro</option>
                <option value="studio">Studio</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <span className="col-span-3 text-white/50">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "—"}
              </span>
              <div className="col-span-1 flex justify-end">
                <button
                  type="submit"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10"
                >
                  Save
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
