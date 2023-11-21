import axios from "axios";

export const auth = axios.create({
  baseURL: "https://api-mart-auth.onrender.com/api",
  withCredentials: true,
});

export const profile = axios.create({
  baseURL: "http://localhost:3014/api",
  withCredentials: true,
});
