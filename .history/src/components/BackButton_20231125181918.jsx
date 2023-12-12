import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const excludedRoutes = ["/", "/login", "", "/register"];

  const shouldNavigateBack = () => {
    return !excludedRoutes.includes(location.pathname);
  };

  const goBack = () => {
    if (shouldNavigateBack) {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={goBack}
      className='bg-white-900 text-gray-900 py-2 px-4 rounded hover:bg-blue-700 mr-1 mb-4'
    >
      Back
    </button>
  );
}

export default BackButton;
