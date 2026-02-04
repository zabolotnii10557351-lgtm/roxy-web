import { redirect } from "next/navigation";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";
import { getUserPlanEntitlements } from "@/lib/pricing/server";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function NewCharacterPage() {
  const { supabase, workspaceId, user } = await requireUserAndWorkspace();

  const { entitlements } = await getUserPlanEntitlements({
    supabase,
    userId: user.id,
  });

  if (entitlements?.max_characters != null) {
    const { count, error: countError } = await supabase
      .from("characters")
      .select("id", { count: "exact", head: true })
      .eq("workspace_id", workspaceId);

    if (countError) {
      return (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          Failed to check plan limits. {countError.message}
        </div>
      );
    }

    if (typeof count === "number" && count >= entitlements.max_characters) {
      return (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Character limit reached for your plan. Upgrade required.
        </div>
      );
    }
  }

  const locale = await getLocaleFromRequest();
  const defaultConfig = CharacterConfigSchema.parse({
    language: { primary: locale },
  });

  const { data, error } = await supabase
    .from("characters")
    .insert({
      workspace_id: workspaceId,
      name: "New character",
      config: defaultConfig,
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    return (
      <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        Failed to create a character. {error?.message ?? ""}
      </div>
    );
  }

  redirect(`/app/character-builder/${data.id}`);
}
