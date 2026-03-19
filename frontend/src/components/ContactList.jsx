import { useEffect } from "react";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useChatStore } from "../store/useChatStore";

function ContactList() {
  const { getAllContact, allContacts, isUsersLoading, setSelectesUser } =
    useChatStore();

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
            onClick={() => setSelectesUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className={`avatar online`}>
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
