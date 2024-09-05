import React, { useState } from "react";
import CompaniesList from "./CompaniesList";
import CompaniesForm from "./CompaniesForm";

const CompaniesPage = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [mode, setMode] = useState("create");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setMode("edit");
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setMode("edit");
  };

  const handleDelete = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleSuccess = () => {
    setMode("create");
    setSelectedCompany(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <CompaniesForm
        company={selectedCompany}
        onSuccess={handleSuccess}
        mode={mode}
      />
      <CompaniesList
        onCompanySelect={handleCompanySelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshKey={refreshKey}
      />
    </div>
  );
};

export default CompaniesPage;
