import { create } from "zustand";
import { axiosInstance } from "../libs/aixos";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnable: false,

  toggleSound: () => {
    set((state) => ({
      isSoundEnable: !state.isSoundEnable,
    }));
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContact: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/message/contact");
      set({ allContacts: [...res.data] });
    } catch (error) {
      toast.error("Load contacts fail");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getChatPartner: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/message/chat");
      set({ chats: [...res.data] });
    } catch (error) {
      toast.error("Load contacts fail");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/message/${id}`);
      set({ messages: [...res.data] });
    } catch (error) {
      toast.error("Load messages fail");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
