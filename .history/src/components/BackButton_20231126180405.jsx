import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const historyStack = [];

  const excludedRoutes = ["/", "/login", "/register"];

  const goBack = () => {
    const previousRoute = historyStack[historyStack.length - 2];

    if (!excludedRoutes.includes(previousRoute)) {
      historyStack.pop();
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
