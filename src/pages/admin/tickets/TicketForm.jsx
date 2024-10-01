import React, { useState } from "react";

const TicketForm = ({ ticket, onSuccess }) => {
  const [formData, setFormData] = useState(
    ticket || { title: "", description: "" }
  );

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
    <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Ticket Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Ticket Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
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

export default TicketForm;
