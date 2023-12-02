import axios from "axios";

const { API_LOCAL_URL, API_PRODUCTION_URL } = process.env;

if (!API_PRODUCTION_URL || !API_LOCAL_URL)
  throw new Error("URL APIs is not available");

export const profile = axios.create({
  baseURL: API_PRODUCTION_URL,
  withCredentials: true,
});
