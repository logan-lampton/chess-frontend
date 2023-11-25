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

  return <button onClick={goBack}>Back</button>;
}

export default BackButton;
