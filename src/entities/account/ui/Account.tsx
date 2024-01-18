import { Avatar } from "entities/avatar/ui";
import { useEffect, useState } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import { useSessionContext } from "shared/providers";
import { GetProfileQuery, getProfileQuery } from "../api";

export const Account = () => {
  const { user, userRole } = useSessionContext();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<GetProfileQuery["username"]>("");
  const [website, setWebsite] = useState<GetProfileQuery["website"]>("");
  const [avatar_url, setAvatarUrl] =
    useState<GetProfileQuery["avatar_url"]>("");

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (!user) return;
      setLoading(true);

      const { data, error } = await getProfileQuery(user);

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [user]);

  async function updateProfile(
    event: React.FormEvent<HTMLFormElement | HTMLInputElement>,
    avatarUrl: string
  ) {
    if (!user) return;

    event.preventDefault();

    setLoading(true);

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date() as any,
    };

    const { error } = await SUPABASE_CLIENT.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          updateProfile(event, avatar_url || "");
        }}
        className="form-widget"
      >
        <Avatar
          url={avatar_url || ""}
          size={150}
          onUpload={(event, url) => {
            updateProfile(event, url);
          }}
        />
        <div>
          <h2>Role - {userRole || "?"}</h2>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user?.email} disabled />
        </div>
        <div className="field">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <br />

        <div>
          <button
            className="button block primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};
