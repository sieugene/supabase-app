import { useContext } from "react";
import { Context } from "../SessionProvider";

export const useSessionContext = () => useContext(Context);
