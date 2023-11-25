import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const excludedRoutes = ["/", "/login", "", "/register"];

  const goBack = () => {
    if (!excludedRoutes.includes(location.pathname)) {
      navigate(-1);
    }
  };

  return <button onClick={goBack}>Back</button>;
}

export default BackButton;
