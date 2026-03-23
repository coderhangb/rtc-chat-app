import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://rtc-chat-app-1ql9.onrender.com",
  withCredentials: true,
});
