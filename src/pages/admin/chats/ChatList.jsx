import React from "react";

const ChatList = ({ onSelect }) => {
  const chats = [
    { id: 1, title: "Chat A", message: "Hello" },
    { id: 2, title: "Chat B", message: "Hi there" },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Chat List</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
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
