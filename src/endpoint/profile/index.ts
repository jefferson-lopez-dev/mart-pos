import { profile } from "../config";
import { UpdateDataProfile } from "./types";

const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const apiGetProfileData = async (id: string | number) => {
  return await profile.post("", id);
};

export const apiUpdateProfileData = async (data: UpdateDataProfile) => {
  return await profile.put("", data);
};

export const apiChangeProfilePicture = async (data: any) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return await profile.put("/picture", form, header);
};

export const apiDeleteProfilePicture = async () => {
  return await profile.delete("/picture");
};
