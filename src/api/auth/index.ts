import { auth } from "../config";

export const apiLogin = async (data: object) => {
  return await auth.post("login", data, {
    withCredentials: true,
  });
};

export const apiRegister = async (data: object) => {
  return await auth.post("register", data);
};

export const apiLogout = async () => {
  return await auth.post("logout");
};

export const apiVerifyToken = async () => {
  return await auth.get("verify-token");
};

export const apiGetAccount = async () => {
  return await auth.get("account");
};
