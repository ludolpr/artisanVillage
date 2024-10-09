import React from "react";

const MessageList = ({ onSelect }) => {
  const messages = [
    { id: 1, subject: "Message A", body: "Hello" },
    { id: 2, subject: "Message B", body: "Hi there" },
    // Add more dummy data as needed
  ];

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className=" font-bold mb-4 ">Message List</h2>
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            className="mb-2 p-4  rounded cursor-pointer  "
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
