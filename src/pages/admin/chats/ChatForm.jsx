import React, { useState } from "react";

const ChatForm = ({ chat, onSuccess }) => {
  const [formData, setFormData] = useState(chat || { title: "", message: "" });

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
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Chat Form</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Chat Title
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
        <label className="block text-gray-700 mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
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

export default ChatForm;
