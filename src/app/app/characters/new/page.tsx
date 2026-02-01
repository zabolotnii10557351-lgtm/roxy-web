import { redirect } from "next/navigation";
import { requireUserAndWorkspace } from "@/lib/workspace/server";
import { CharacterConfigSchema } from "@/lib/schemas/workspace";

export default async function NewCharacterPage() {
  const { supabase, workspaceId } = await requireUserAndWorkspace();

  const defaultConfig = CharacterConfigSchema.parse({});

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
