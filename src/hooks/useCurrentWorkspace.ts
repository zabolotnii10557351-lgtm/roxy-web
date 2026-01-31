"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";

export interface Workspace {
  id: string;
  name: string;
}

type UserSettingsWorkspaceJoin = {
  default_workspace_id: string | null;
  workspaces: { id: string; name: string } | null;
};

export function useCurrentWorkspace() {
  const { user, loading: sessionLoading } = useSession();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      setWorkspace(null);
      setWorkspaceId(null);
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    let cancelled = false;

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const { data, error: queryError } = await supabase
          .from("user_settings")
          .select(
            "default_workspace_id, workspaces:default_workspace_id ( id, name )"
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (cancelled) return;

        if (queryError) {
          setError(queryError.message);
          setWorkspace(null);
          setWorkspaceId(null);
          setLoading(false);
          return;
        }

        const row = (data ?? null) as UserSettingsWorkspaceJoin | null;
        const defaultWorkspaceId = row?.default_workspace_id ?? null;
        const ws = row?.workspaces ?? null;

        setWorkspaceId(defaultWorkspaceId);
        setWorkspace(ws ? ({ id: ws.id, name: ws.name } as Workspace) : null);
        setLoading(false);
      } catch (e: unknown) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load workspace");
        setWorkspace(null);
        setWorkspaceId(null);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading]);

  return { workspace, workspaceId, loading: sessionLoading || loading, error };
}
