import { ProfileUserContext } from "@/context";
import { useContext } from "react";

interface useProfileProps {
  updateProfile: (data: object) => Promise<any>;
  changePhoto: () => Promise<any>;
  deletePhoto: () => Promise<any>;
  getProfile: () => Promise<any>;
  profilePhoto: any;
  data: any;
}

export const useProfile = () => {
  const context = useContext(ProfileUserContext) as useProfileProps;
  if (!context)
    throw new Error("useProfileUser must be used within a ProfileUserContext");
  return context;
};
