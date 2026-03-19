import { useEffect } from "react";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useChatStore } from "../store/useChatStore";

function ChatList() {
  const { getChatPartner, chats, isUsersLoading, setSelectesUser } =
    useChatStore();

  useEffect(() => {
    getChatPartner();
  }, [getChatPartner]);

  if (isUsersLoading) {
    return <UserLoadingSkeleton />;
  }

  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat, index) => {
        return (
          <div
            key={chat._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectesUser(chat)}
          >
            <div className="flex items-center gap-3">
              <div className={`avatar online`}>
                <div className="size-12 rounded-full">
                  <img
                    src={chat.profileAvatar || "./avatar.png"}
                    alt={chat.fullName}
                  />
                </div>
              </div>
              <h4 className="text-slate-200 font-medium truncate">
                {chat.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
