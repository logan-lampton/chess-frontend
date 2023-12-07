import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [historyStack, setHistoryStack] = useState([]);
  const historyRef = useRef(["/home"]);

  useEffect(() => {
    if (!historyRef.current.includes(pathname)) {
      historyRef.current.push(pathname);
      setHistoryStack(historyRef.current);
    }
  }, [pathname]);

  console.log(historyRef.current)

  const excludedRoutes = ["/", "/login", "/register", undefined];

  const goBack = () => {
    const previousRoute = historyStack[historyStack.length - 2];

    if (!excludedRoutes.includes(previousRoute)) {
      historyRef.current.pop();
      setHistoryStack(historyRef.current);
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
