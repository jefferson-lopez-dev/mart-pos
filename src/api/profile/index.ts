import { profile } from "../config";
import { UpdateDataProfile } from "./types";

export const apiGetProfileData = async () => {
  return await profile.get("/user/profile");
};

export const apiUpdateProfileData = async (data: UpdateDataProfile) => {
  return await profile.put("/user/profile", data);
};

export const apiChangeProfilePicture = async (data: any) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return await profile.put("/user/profile/photo", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const apiDeleteProfilePicture = async () => {
  return await profile.delete("/user/profile/photo");
};
