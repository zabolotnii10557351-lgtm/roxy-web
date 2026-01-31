"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";

export interface UserProfile {
  id: string;
  email: string | null;
  display_name: string;
  username: string | null;
  avatar_url: string | null;
}

export function useCurrentUserProfile() {
  const { user, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionLoading) return;

    if (!user) {
      setProfile(null);
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
          .from("profiles")
          .select("id,email,display_name,username,avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (cancelled) return;

        if (queryError) {
          setError(queryError.message);
          setProfile(null);
          setLoading(false);
          return;
        }

        setProfile((data as UserProfile) ?? null);
        setLoading(false);
      } catch (e: unknown) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load profile");
        setProfile(null);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading]);

  return { profile, loading: sessionLoading || loading, error };
}
