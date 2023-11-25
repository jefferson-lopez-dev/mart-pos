import axios from "axios";

const url_local = "http://localhost:3030/api/";
const url_serve = "https://api-mart-auth.onrender.com/api/";

export const auth = axios.create({
  baseURL: url_serve,
  withCredentials: true,
});

export const profile = axios.create({
  baseURL: "http://localhost:3014/api",
  withCredentials: true,
});
