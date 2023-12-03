import axios from "axios";

const endPoint = "api/creds_profile";
const API_PRODUCTION_URL = `https://api-mart-profile.onrender.com/${endPoint}`;
const API_LOCAL_URL = ` http://localhost:3014/${endPoint}`;

export const profile = axios.create({
  baseURL: API_PRODUCTION_URL,
  withCredentials: true,
});
