"use client";
import {
  apiChangeProfilePicture,
  apiDeleteProfilePicture,
  apiGetProfileData,
  apiUpdateProfileData,
} from "@/endpoint";
import { children } from "@/interface";
import { createContext, createRef, useEffect, useState } from "react";

export const ProfileUserContext = createContext({});

export const ProfileUserProvider = ({ children }: children) => {
  const [profilePhoto, setProfilePhoto] = useState<any>(false);
  const [data, setData] = useState<any>(false);
  const [newPhoto, setNewPhoto] = useState<{ photo: File | null }>({
    photo: null,
  });

  const getProfile = async (id: string | number) => {
    const res = await apiGetProfileData(id);
    if (res.data.status === 204) {
      setData(res.data.creds_profile);
      setProfilePhoto(res.data.creds_profile.picture.url);
    }
    return res.data;
  };

  const updateProfile = async (data: object) => {
    await apiUpdateProfileData(data);
  };

  const changePhoto = async () => {
    if (newPhoto.photo === null) return;
    const res = await apiChangeProfilePicture(newPhoto);
    if (res.data.status === 200) {
      setNewPhoto({
        photo: null,
      });
    }
  };

  const deletePhoto = async () => {
    await apiDeleteProfilePicture();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setNewPhoto({
      photo: selectedFile,
    });
  };

  const inputFileRef = createRef<HTMLInputElement>();
  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    if (newPhoto.photo !== null) {
      changePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPhoto]);

  return (
    <ProfileUserContext.Provider
      value={{
        getProfile,
        updateProfile,
        changePhoto,
        deletePhoto,
        handleFileChange,
        handleImageClick,
        inputFileRef,
        profilePhoto,
        data,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
