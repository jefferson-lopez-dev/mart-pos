import axios from "axios";

const ENDPOINT_PROFILE = "api/creds_profile";
const API_PRODUCTION_PROFILE_URL = `https://api-mart-profile.onrender.com/${ENDPOINT_PROFILE}`;
const API_LOCAL_PROFILE_URL = ` http://localhost:3014/${ENDPOINT_PROFILE}`;

const ENDPOINT_POS = "api/pos";
const API_PRODUCTION_POS_URL = `http://localhost:1204/${ENDPOINT_POS}`;
const API_LOCAL_POS_URL = `http://localhost:1204/${ENDPOINT_POS}`;

export const profile = axios.create({
  baseURL: API_PRODUCTION_PROFILE_URL,
  withCredentials: true,
});

export const pos = axios.create({
  baseURL: API_LOCAL_POS_URL,
});
