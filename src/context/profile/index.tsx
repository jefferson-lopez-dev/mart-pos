/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { toast } from "@/components/ui/use-toast";
import {
  apiChangeProfilePicture,
  apiDeleteProfilePicture,
  apiGetProfileData,
  apiUpdateProfileData,
} from "@/endpoint";
import { DataCredsProfile, children } from "@/interface";
import { ToastAction } from "@radix-ui/react-toast";
import { useSession } from "next-auth/react";
import { createContext, createRef, useEffect, useState } from "react";

export const ProfileUserContext = createContext({});

const initalData = {
  country: "",
  createdAt: "",
  email: "",
  fullname: "",
  picture: {
    url: "",
    status: "",
  },
};

export const ProfileUserProvider = ({ children }: children) => {
  const { data: session }: any = useSession();
  const [profilePhoto, setProfilePhoto] = useState<any>(false);
  const [onLoadImg, setOnLoadImg] = useState(false);
  const [data, setData] = useState<DataCredsProfile>(initalData);
  const [newPhoto, setNewPhoto] = useState<{ photo: File | null }>({
    photo: null,
  });

  const getProfile = async () => {
    if (!session?.user?._id) return;
    const { creds_profile, status, data } = await apiGetProfileData({
      id: session?.user?._id,
      fullname: session?.user?.fullname,
      email: session?.user?.email,
    });
    const { picture } = creds_profile;
    const { url } = picture;

    if (status === 204) {
      setData(creds_profile);
      setProfilePhoto(url);
    }
    return data;
  };

  const updateProfile = async (data: object) => {
    const res = await apiUpdateProfileData({ id: session?.user?._id, ...data });
    if (res.data.status === 200) {
      getProfile();
    }
  };

  const changePhoto = async () => {
    if (newPhoto.photo === null) return;
    toast({
      title: "Uploading new profile photo. Please wait.",
      description: "This process may take a moment.",
    });
    const data = await getProfile();
    const res = await apiChangeProfilePicture(newPhoto, data.id);
    if (res.data.status === 200) {
      await getProfile();
      setNewPhoto({
        photo: null,
      });
      toast({
        title: "Profile photo changed successfully!",
        description: "The new photo is now uploaded.",
      });
    }
  };

  const deletePhoto = async () => {
    const data = await getProfile();
    toast({
      title: "Deleting profile photo. Please wait.",
      description: "This process may take a moment.",
    });
    const res = await apiDeleteProfilePicture(data.id);
    if (res.data.status === 200) {
      await getProfile();
      toast({
        title: "Profile photo deleted successfully!",
        description: "You no longer have a profile photo.",
      });
    }
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

  const handleImageLoad = () => {
    setTimeout(() => {
      setOnLoadImg(true);
    }, 1000);
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    if (newPhoto.photo !== null) {
      changePhoto();
    }
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
        onLoadImg,
        handleImageLoad,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
