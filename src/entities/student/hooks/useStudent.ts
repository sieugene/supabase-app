import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useSessionContext } from "shared/providers";
import useSWR from "swr";

export const useStudent = () => {
  const { user } = useSessionContext();
  return useSWR(user && `/student/${user?.id}`, async () => {
    if (!user) return null;
    const { data: students, error } = await SUPABASE_CLIENT.from("students")
      .select("*")
      .eq("userId", user.id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return students;
  });
};
