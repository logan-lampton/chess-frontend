import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate.goBack();
  };

  return <button onClick={goBack}>Back</button>;
}

export default BackButton;
