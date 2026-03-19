import { create } from "zustand";
import { axiosInstance } from "../libs/aixos.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUploadingAvatar: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
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
}));
