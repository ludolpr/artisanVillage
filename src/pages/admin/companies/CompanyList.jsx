import React from "react";

const CompanyList = ({ onSelect }) => {
  const companies = [
    { id: 1, name: "Company A", address: "Address A" },
    { id: 2, name: "Company B", address: "Address B" },
    // Add more dummy data as needed
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#9a7d6b]">Company List</h2>
      <ul>
        {companies.map((company) => (
          <li
            key={company.id}
            className="mb-2 p-4 bg-gray-100 rounded cursor-pointer hover:bg-[#9a7d6b] hover:text-white"
            onClick={() => onSelect(company)}
          >
            {company.name} - {company.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
