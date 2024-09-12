import React from "react";

const menuItems = [
  { name: "Utilisateurs" },
  { name: "Roles" },
  { name: "Entreprises" },
  { name: "Produits" },
  { name: "Tags" },
  { name: "Categories" },
  { name: "Chats" },
  { name: "Messages" },
  { name: "Tickets" },
];

function Sidebar({ activeItem, setActiveItem }) {
  return (
    <aside className="bg-gray-100 h-100 h-screen text-dark w-64 flex flex-col space-y-6 py-7 px-2">
      {/* Logo */}
      <div className="text-[#9a7d6b] flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Dashboard</span>
      </div>
      {/* Menu Items */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-[#9a7d6b] hover:text-white w-full text-left ${
              activeItem === item.name ? "bg-[#d9b99b]" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
