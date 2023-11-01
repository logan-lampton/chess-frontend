import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    // Handle login logic
    setLoggedIn(true);
  };

  const openLogin = () => {
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowRegister(true);
  };

  return (
    <Router>
      <div className='flex flex-col items-center h-screen'>
        <header>
          <Header isLoggedIn={isLoggedIn} />
        </header>
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="/register" element={<Register handleLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
