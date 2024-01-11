import { Session } from "@supabase/supabase-js";
import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";

type SessionContextT = {
  session: Session | null;
  user: Session["user"] | null;
};
export const Context = createContext<SessionContextT>({
  session: null,
  user: null,
});

export const SessionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    SUPABASE_CLIENT.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    SUPABASE_CLIENT.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const user = useMemo(() => session?.user || null, [session]);

  return (
    <Context.Provider value={{ session, user }}>{children}</Context.Provider>
  );
};
