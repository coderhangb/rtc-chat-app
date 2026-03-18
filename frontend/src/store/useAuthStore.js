import { create } from "zustand";
import { axiosInstance } from "../libs/aixos.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

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
}));
