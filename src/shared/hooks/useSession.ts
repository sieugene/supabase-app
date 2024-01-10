import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    SUPABASE_CLIENT.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    SUPABASE_CLIENT.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return session;
};
