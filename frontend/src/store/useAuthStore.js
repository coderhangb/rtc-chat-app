import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../libs/axios.js";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUploadingAvatar: false,
  socket: null,
  onlineUser: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      set({ authUser: res.data });

      // toast from react hot toast
      toast.success("Account created successfully!");

      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response.data.fullName ||
          error.response.data.email ||
          error.response.data.password,
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: res.data });

      // toast from react hot toast
      toast.success("Login successfully!");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.email || error.response.data.password);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });

      // toast from react hot toast
      toast.success(res.data.message);

      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout fail");
    }
  },

  updateProfile: async (data) => {
    set({ isUploadingAvatar: true });
    try {
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data.updatedUser });

      // toast from react hot toast
      toast.success("Upload avatar success!");
    } catch (error) {
      toast.error("Upload avatar fail");
    } finally {
      set({ isUploadingAvatar: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("https://rtc-chat-app-1ql9.onrender.com", {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    socket.on("userOnline", (userIdList) => {
      set({ onlineUser: userIdList });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
