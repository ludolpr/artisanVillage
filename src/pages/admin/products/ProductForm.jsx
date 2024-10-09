// src/admin/products/ProductForm.js
import React, { useState } from "react";

const ProductForm = ({ product, onSuccess }) => {
  const [formData, setFormData] = useState(product || { name: "", price: "" });

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
      <h2 className=" font-bold mb-4 ">Product Form</h2>
      <div className="mb-4">
        <label className="block  mb-2" htmlFor="name">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 borderrounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="button3 px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
