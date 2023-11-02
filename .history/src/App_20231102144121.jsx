import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ChessClub from "./components/ChessClub";
import AddClub from "./components/AddClub";
import AddStudent from "./components/AddStudent";
import StudentPairings from "./components/StudentPairings";
import ViewClubGames from "./components/ViewClubGames";
import Student from "./components/Student";
import ViewLessons from "./components/ViewLessons";
import ViewGameHistory from "./components/ViewGameHistory";

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
          <Route
            path='/'
            element={
              <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path='/register'
            element={
              <Register handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path='/home' element={<Home />} />
          <Route path='/chessclub' element={<ChessClub />} />
          <Route path='/addclub' element={<AddClub />} />
          <Route path='/addstudent' element={<AddStudent />} />
          <Route path='/studentpairings' element={<StudentPairings />} />
          <Route path='/viewclubgames' element={<ViewClubGames />} />
          <Route path='/student' element={<Student />} />
          <Route path='/viewlessons' element={<ViewLessons />} />
          <Route path='/viewgamehistory' element={<ViewGameHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
