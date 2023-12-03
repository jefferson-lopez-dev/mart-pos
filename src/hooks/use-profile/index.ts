import { ProfileUserContext } from "@/context";
import { DataCredsProfile } from "@/interface";
import React, { RefObject, useContext } from "react";

interface useProfileProps {
  updateProfile: (data: object) => Promise<any>;
  changePhoto: () => Promise<any>;
  deletePhoto: () => Promise<any>;
  getProfile: () => Promise<any>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageClick: () => void;
  inputFileRef: RefObject<HTMLInputElement>;
  profilePhoto: any;
  data: DataCredsProfile;
  onLoadImg: boolean;
  handleImageLoad: () => {};
}

export const useProfile = () => {
  const context = useContext(ProfileUserContext) as useProfileProps;
  if (!context)
    throw new Error("useProfileUser must be used within a ProfileUserContext");
  return context;
};
