import React, { useState } from "react";
import RolesList from "./RolesList";
import RolesForm from "./RolesForm";

const RolesPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [mode, setMode] = useState("create");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setMode("edit");
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setMode("edit");
  };

  const handleDelete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSuccess = () => {
    setMode("create");
    setSelectedRole(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <RolesForm role={selectedRole} onSuccess={handleSuccess} mode={mode} />
      <RolesList
        onRoleSelect={handleRoleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshKey={refreshKey}
      />
    </div>
  );
};

export default RolesPage;
