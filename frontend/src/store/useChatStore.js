import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { useAuthStore } from "./useAuthStore";
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
      ttoast.error(error?.response?.data?.message || "Something gone wrong");
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
      toast.error(error?.response?.data?.message || "Something gone wrong");
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
      toast.error(error?.response?.data?.message || "Something gone wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp ${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      status: "Sending...",
      isOptimistic: true, // define fake message before server response (optional)
    };

    // update UI before call API to server
    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    // call API
    try {
      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        messageData,
      );
      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === tempId ? res.data : message,
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempId),
      }));
      toast.error(error?.response?.data?.message || "Something gone wrong");
    }
  },
}));
