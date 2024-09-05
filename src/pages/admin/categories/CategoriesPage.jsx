import React, { useState } from "react";
import CategoriesList from "./CategoriesList";
import CategoriesForm from "./CategoriesForm";

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mode, setMode] = useState("create");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMode("edit");
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setMode("edit");
  };

  const handleDelete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSuccess = () => {
    setMode("create");
    setSelectedCategory(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <CategoriesForm
        category={selectedCategory}
        onSuccess={handleSuccess}
        mode={mode}
      />
      <CategoriesList
        onCategorySelect={handleCategorySelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshKey={refreshKey}
      />
    </div>
  );
};

export default CategoriesPage;
