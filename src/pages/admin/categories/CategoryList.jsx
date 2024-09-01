import React from "react";

const CategoryList = ({ onSelect }) => {
  const categories = [
    { id: 1, name: "Category A" },
    { id: 2, name: "Category B" },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Category List</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
