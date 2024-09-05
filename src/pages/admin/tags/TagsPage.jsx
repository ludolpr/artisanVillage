import React, { useState } from "react";
import TagsList from "./TagsList";
import TagsForm from "./TagsForm";

const TagsPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [mode, setMode] = useState("create");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setMode("edit");
  };

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    setMode("edit");
  };

  const handleDelete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSuccess = () => {
    setMode("create");
    setSelectedTag(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <TagsForm tag={selectedTag} onSuccess={handleSuccess} mode={mode} />
      <TagsList
        onTagSelect={handleTagSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshKey={refreshKey}
      />
    </div>
  );
};

export default TagsPage;
