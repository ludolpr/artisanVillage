import React from "react";

const UserList = ({ onSelect }) => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">
        Liste d'utilisateur
      </h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(user)}
          >
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
