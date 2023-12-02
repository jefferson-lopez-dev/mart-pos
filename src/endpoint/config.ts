import axios from "axios";

export const profile = axios.create({
  baseURL: "https://api-mart-profile.onrender.com/api/creds_profile",
  withCredentials: true,
});
