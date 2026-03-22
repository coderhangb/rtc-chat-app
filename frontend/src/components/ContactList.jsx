import { useEffect } from "react";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContact, allContacts, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUser } = useAuthStore();

  useEffect(() => {
    getAllContact();
  }, [getAllContact]);

  if (isUsersLoading) {
    return <UserLoadingSkeleton />;
  }

  return (
    <>
      {allContacts.map((contact) => {
        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${
                  onlineUser.includes(contact._id) ? "online" : "offline"
                }`}
              >
                <div className="size-12 rounded-full">
                  <img
                    src={contact.profileAvatar || "./avatar.png"}
                    alt={contact.fullName}
                  />
                </div>
              </div>
              <h4 className="text-slate-200 font-medium truncate">
                {contact.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
