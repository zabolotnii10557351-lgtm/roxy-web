import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ShareSession = {
  token: string;
  status: string;
  created_at: string;
  character_display_name: string;
};

export default async function OverlaySharePage({
  params,
}: {
  params: { token: string };
}) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_share_session", {
    p_token: params.token,
  });

  if (error || !data || data.length === 0) {
    notFound();
  }

  const session = data[0] as ShareSession;

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <div className="rounded-3xl border border-white/10 bg-black/70 px-6 py-5 text-center text-white shadow-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">RoxStreamAI</p>
        <h1 className="mt-3 text-2xl font-semibold">
          {session.character_display_name || "Character"}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Status: {session.status}
        </p>
        <p className="mt-1 text-xs text-white/40">
          Session: {session.token.slice(0, 8)}…
        </p>
      </div>
    </div>
  );
}