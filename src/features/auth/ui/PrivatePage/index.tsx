import { FC, ReactNode } from "react";
import { useSessionContext } from "shared/providers";
import Auth from "../Auth";

export const PrivatePage: FC<{ children: ReactNode }> = ({ children }) => {
  const { session } = useSessionContext();
  if (!session) {
    return <Auth />;
  }
  return <>{children}</>;
};
