import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname !== "/") {
      navigate(-1);
    }
  };

  return <button onClick={goBack}>Back</button>;
}

export default BackButton;
