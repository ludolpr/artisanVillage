import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-auto disabled">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-x-4 border-[#9a7d6b] border-double rounded-full animate-spin"></div>
        <p className="text-center text-gray-500">Chargement...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
