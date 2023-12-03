import axios from "axios";

//API_PRODUCTION_URL

export const profile = axios.create({
  baseURL: "http://localhost:3014/api/creds_profile",
  withCredentials: true,
});
