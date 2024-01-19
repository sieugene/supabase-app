import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useSessionContext } from "shared/providers";
import useSWR from "swr";

export const useUserRole = () => {
  const { user } = useSessionContext();

  return useSWR(user?.id && `${user?.id}/role`, async () => {
    if (!user) return "";
    const { data } = await SUPABASE_CLIENT.rpc("get_claim", {
      claim: "userrole",
      uid: user.id,
    });
    return (data as unknown[])?.[0] as string;
  });
};
