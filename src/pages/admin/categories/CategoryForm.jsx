import React, { useState } from "react";

const CategoryForm = ({ category, onSuccess }) => {
  const [formData, setFormData] = useState(category || { name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Category Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-[#9a7d6b] text-white px-4 py-2 rounded hover:bg-[#8b6d59]"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
