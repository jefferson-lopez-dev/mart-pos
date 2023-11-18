"use client";
import {
  apiChangeProfilePicture,
  apiDeleteProfilePicture,
  apiGetProfileData,
  apiUpdateProfileData,
} from "@/api";
import { children } from "@/interface";
import { createContext, useState } from "react";

export const ProfileUserContext = createContext({});

export const ProfileUserProvider = ({ children }: children) => {
  const [profilePhoto, setProfilePhoto] = useState<any>(false);
  const [data, setData] = useState<any>(false);
  const [newPhoto, setNewPhoto] = useState({ photo: "" });

  const getProfile = async () => {
    const res = await apiGetProfileData();
    if (res.data.status === 204) {
      setData(res.data.data_user);
      setProfilePhoto(res.data.data_user.profile_picture.url);
    }
  };

  const updateProfile = async (data: object) => {
    const res = await apiUpdateProfileData(data);
    if (res.data.status === 200) {
      await getProfile();
    }
  };

  const changePhoto = async () => {
    if (newPhoto.photo === "") return;
    const res = await apiChangeProfilePicture(newPhoto);
    if (res.data.status === 200) {
      await getProfile();
      setNewPhoto({
        photo: "",
      });
    }
  };

  const deletePhoto = async () => {
    const res = await apiDeleteProfilePicture();
    if (res.data.status === 200) {
      await getProfile();
    }
  };

  return (
    <ProfileUserContext.Provider
      value={{
        getProfile,
        updateProfile,
        changePhoto,
        deletePhoto,
        profilePhoto,
        data,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
