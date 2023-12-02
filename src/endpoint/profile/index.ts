import { profile } from "../config";
import { UpdateDataProfile } from "./types";

const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

interface DataGetProfile {
  id: string;
}

export const apiGetProfileData = async (data: DataGetProfile) => {
  return await profile.post("", data);
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
