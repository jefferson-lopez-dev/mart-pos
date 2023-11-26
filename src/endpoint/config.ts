import axios from "axios";

export const profile = axios.create({
  baseURL: "http://localhost:3014/api",
  withCredentials: true,
});
