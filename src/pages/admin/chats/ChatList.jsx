import React from "react";

const ChatList = ({ onSelect }) => {
  const chats = [
    { id: 1, title: "Chat A", message: "Hello" },
    { id: 2, title: "Chat B", message: "Hi there" },
    // Add more dummy data as needed
  ];

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className=" font-bold mb-4 ">Chat List</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="mb-2 p-4  rounded cursor-pointer  "
            onClick={() => onSelect(chat)}
          >
            {chat.title} - {chat.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
