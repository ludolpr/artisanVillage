import React from "react";

const TagList = ({ onSelect }) => {
  const tags = [
    { id: 1, name: "Tag A" },
    { id: 2, name: "Tag B" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Tag List</h2>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(tag)}
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
