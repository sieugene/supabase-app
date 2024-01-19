import { PostgrestSingleResponse, User } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { SUPABASE_CLIENT } from "shared/api/supabase";

export const getProfileQuery = async (
  user: User
): Promise<GetProfileQueryResponse> => {
  const result = await SUPABASE_CLIENT.from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", user.id)
    .single();

  return result;
};

export type GetProfileQuery = Pick<
  Tables<"profiles">,
  "avatar_url" | "username" | "website"
>;
export type GetProfileQueryResponse = PostgrestSingleResponse<GetProfileQuery>;
