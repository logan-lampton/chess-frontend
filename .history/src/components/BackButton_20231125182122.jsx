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
      className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-5 right-12 h-15 w-100'
    >
      Back
    </button>
  );
}

export default BackButton;
