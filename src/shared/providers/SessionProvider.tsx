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
import useSWR from "swr";

type SessionContextT = {
  session: Session | null;
  user: Session["user"] | null;
  userRole: string;
};
export const Context = createContext<SessionContextT>({
  session: null,
  user: null,
  userRole: "",
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
  const userRole = useMemo(
    () => (user?.app_metadata as unknown as { userrole: string })?.userrole,
    [user?.app_metadata]
  );

  useSWR(`user/role/${user?.id}`, () => {});

  return (
    <Context.Provider value={{ session, user, userRole }}>
      {children}
    </Context.Provider>
  );
};
