import React from "react";

const menuItems = [
  { name: "Utilisateurs" },
  { name: "Roles" },
  { name: "Entreprises" },
  { name: "Produits" },
  { name: "Tags" },
  { name: "Categories" },
  { name: "Chats", disabled: true },
  { name: "Messages", disabled: true },
  { name: "Tickets", disabled: true },
];

function Sidebar({ activeItem, setActiveItem }) {
  return (
    <aside className=" h-screen text-dark w-64 flex flex-col space-y-6 py-7 px-2">
      {/* Logo */}
      <div className=" flex items-center space-x-2 px-4">
        <span className="title1 text-2xl font-extrabold">Dashboard</span>
      </div>
      {/* Menu Items */}
      <nav className="flex-1 card1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`block py-2.5 px-4 rounded transition duration-200  w-full text-left button3 mb-2 mt-2${
              activeItem === item.name ? "" : ""
            } ${item.disabled ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={() => !item.disabled && setActiveItem(item.name)}
            disabled={item.disabled}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
