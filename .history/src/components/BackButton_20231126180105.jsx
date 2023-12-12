import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const excludedRoutes = ["/", "/login", "/register"];

  const goBack = () => {
    const previousRoute = history.entries[history.index - 1]?.pathname;

    if (!excludedRoutes.includes(previousRoute)) {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={goBack}
      className='bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded'
    >
      Back
    </button>
  );
}

export default BackButton;
