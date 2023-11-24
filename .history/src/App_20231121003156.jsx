import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import axios from "./axiosConfig";

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
import ViewNotes from "./components/ViewNotes";
import AddNotes from "./components/AddNotes";
import ErrorBoundary from "./ErrorBoundary";
import UpdateClub from "./components/UpdateClub";
import UpdateStudent from "./components/UpdateStudent";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [clubs, setClubs] = useState([]);

  // change instructorId to match the instructor logging in, once that logic is changed from seeded info
  const instructorId = "2";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token && !isLoggedIn) {
        try {
          const response = await axios.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setClubs(response.data.user.clubs);
          setLoggedIn(true);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      setUser(response.data.user);
      setClubs(response.data.user.clubs);
      setLoggedIn(true);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleClubAdded = (newClub) => {
    setClubs((prevClubs) => {
      return [...prevClubs, newClub];
    });
  };

  function handleClubDeleted(id) {
    const newArray = [...clubs];
    setClubs(newArray.filter((club) => club.id !== id));
  }

  const handleClubUpdated = (updatedClub) => {
    setClubs((prevClubs) => {
      return prevClubs.map((club) =>
        club.id === updatedClub.id ? { ...club, ...updatedClub } : club
      );
    });
  };

  function handleStudentAdded(newStudent) {
    setClubs((prevStudents) => {
      return [...prevStudents, newStudent];
    });
  }

  // Add back button links throughout the project (or more links in the homepage, or both!)

  return (
    <Router>
      <ErrorBoundary>
        <div className='flex flex-col items-center h-screen w-screen'>
          <header>
            <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
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
            <Route
              path='/home'
              element={
                <Home
                  clubs={clubs}
                  setClubs={setClubs}
                  handleClubDeleted={handleClubDeleted}
                  handleClubUpdated={handleClubUpdated}
                />
              }
            />
            <Route path='/clubs/:id' element={<ChessClub />} />
            <Route
              path='/addclub'
              element={
                <AddClub
                  instructorId={instructorId}
                  handleClubAdded={handleClubAdded}
                />
              }
            />
            <Route
              path='/addstudent'
              element={<AddStudent handleStudentAdded={handleStudentAdded} />}
            />
            <Route
              path='/updateclub/:id'
              element={
                <UpdateClub
                  instructorId={instructorId}
                  handleClubUpdated={handleClubUpdated}
                />
              }
            />
            <Route path='/updatestudent/:id' element={<UpdateStudent />} />
            <Route path='/studentpairings' element={<StudentPairings />} />
            <Route path='/viewclubgames' element={<ViewClubGames />} />
            <Route path='/students/:id' element={<Student />} />
            <Route path='/viewlessons' element={<ViewLessons />} />
            <Route path='/viewgamehistory' element={<ViewGameHistory />} />
            <Route path='/viewnotes' element={<ViewNotes />} />
            <Route path='/addnotes' element={<AddNotes />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
