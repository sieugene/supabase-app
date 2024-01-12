import { FC, useEffect, useState } from "react";
import { SUPABASE_CLIENT } from "shared/api/supabase";

type Props = {
  url: string;
  size: number;
  onUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    filePath: string
  ) => void;
};
export const Avatar: FC<Props> = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await SUPABASE_CLIENT.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await SUPABASE_CLIENT.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="account-avatar">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }} className="upload">
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : `${avatarUrl ? "Update" : "Upload"} Avatar`}
        </label>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};
