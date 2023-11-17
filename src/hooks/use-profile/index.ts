import { ProfileUserContext } from "@/context";
import { useContext } from "react";

export const useProfileUser = () => {
  const context = useContext(ProfileUserContext);
  if (!context)
    throw new Error("useProfileUser must be used within a ProfileUserContext");
  return context;
};
