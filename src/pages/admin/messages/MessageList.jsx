import React from "react";

const MessageList = ({ onSelect }) => {
  const messages = [
    { id: 1, subject: "Message A", body: "Hello" },
    { id: 2, subject: "Message B", body: "Hi there" },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Message List</h2>
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(message)}
          >
            {message.subject} - {message.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
