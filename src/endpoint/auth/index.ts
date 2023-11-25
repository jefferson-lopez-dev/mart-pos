import axios from "axios";

export const apiRegister = async (data: object) => {
  return await axios.post("/api/auth/signup", data);
};
