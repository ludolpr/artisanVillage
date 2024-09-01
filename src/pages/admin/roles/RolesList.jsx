import React from "react";

const RolesList = ({ onSelect }) => {
  const roles = [
    { id: 1, name: "Role A" },
    { id: 2, name: "Role B" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Role List</h2>
      <ul>
        {roles.map((role) => (
          <li
            key={role.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(role)}
          >
            {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolesList;
