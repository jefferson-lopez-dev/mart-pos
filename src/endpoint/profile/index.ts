import { DataCredsProfile } from "@/interface";
import { profile } from "../config";
import { UpdateDataProfile } from "./types";

const header = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

interface PropsGetProfile {
  id: string;
  fullname?: string;
  country?: string;
  email?: string;
}

export const apiGetProfileData = async (data: PropsGetProfile) => {
  const res = await profile.post("", data);
  return {
    data: res.data,
    creds_profile: res.data.creds_profile as DataCredsProfile,
    message: res.data.message,
    status: res.data.status,
  };
};

export const apiUpdateProfileData = async (data: UpdateDataProfile) => {
  return await profile.put("", data);
};

export const apiChangeProfilePicture = async (data: any, id: string) => {
  const form = new FormData();
  for (let key in data) {
    form.append(key, data[key]);
  }
  return await profile.put(`/picture/${id}`, form, header);
};

export const apiDeleteProfilePicture = async () => {
  return await profile.delete("/picture");
};
