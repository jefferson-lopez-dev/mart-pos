import axios from "axios";

//API_PRODUCTION_URL

export const profile = axios.create({
  baseURL: "https://api-mart-profile.onrender.com/api/creds_profile",
  withCredentials: true,
});
