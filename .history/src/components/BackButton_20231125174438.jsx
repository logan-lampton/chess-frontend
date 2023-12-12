import React from "react";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
}

export default BackButton;
