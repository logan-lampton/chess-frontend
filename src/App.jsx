import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "./axiosConfig";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import AddClub from "./components/AddClub";
import AddStudent from "./components/AddStudent";
import StudentPairings from "./components/StudentPairings";
import AddNotes from "./components/AddNotes";
import ErrorBoundary from "./ErrorBoundary";
import UpdateClub from "./components/UpdateClub";
import UpdateStudent from "./components/UpdateStudent";
import StudentPairSelect from "./components/StudentPairSelect";
import ConfirmationPopUp from "./components/ConfirmationPopUp";
import AddLesson from "./components/AddLesson";

import Home from "./pages/Home";
import ChessClub from "./pages/ChessClub";
import GradeStudentLesson from "./pages/GradeStudentLesson";
import Lesson from "./pages/Lesson";
import Student from "./pages/Student";
import ViewClubGames from "./pages/ViewClubGames";
import ViewCompletedGames from "./pages/ViewCompletedGames";
import ViewLessons from "./pages/ViewLessons";
import ViewGameHistory from "./pages/ViewGameHistory";
import ViewNotes from "./pages/ViewNotes";
import ViewClubLessons from "./pages/ViewClubLessons";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [clubs, setClubs] = useState([]);
  // const [students, setStudents] = useState([]);
  const [instructorId, setInstructorId] = useState("");

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
        // setStudents(response.data.user.clubs.students);
        setLoggedIn(true);
        setInstructorId(response.data.user.id);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
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
      setInstructorId(response.data.user.id);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete("/logout");
      console.log("logged out", response.data);
    } catch (error) {
      console.error("error deleting token", error);
    }
    setUser(null);
    setClubs([]);
    setLoggedIn(false);
    localStorage.removeItem("token");
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

  console.log("App.jsx clubs", clubs);

  return (
    <Router>
      <ErrorBoundary>
        <div className='flex flex-col items-center h-screen w-screen'>
          <header>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          </header>
          <Routes>
            <Route path='/' element={<Login handleLogin={handleLogin} />} />
            <Route
              path='/register'
              element={<Register handleLogin={handleLogin} />}
            />
            {isLoggedIn ? (
              <>
                <Route
                  path='/home'
                  element={
                    <Home
                      clubs={clubs}
                      setClubs={setClubs}
                      handleClubDeleted={handleClubDeleted}
                      handleClubUpdated={handleClubUpdated}
                      instructorId={instructorId}
                    />
                  }
                />
                <Route
                  path='/clubs/:id'
                  element={<ChessClub instructorId={instructorId} />}
                />
                <Route
                  path='/addclub'
                  element={
                    <AddClub
                      instructorId={instructorId}
                      handleClubAdded={handleClubAdded}
                    />
                  }
                />
                <Route path='/addstudent' element={<AddStudent />} />
                <Route
                  path='/updateclub/:id'
                  element={
                    <UpdateClub
                      instructorId={instructorId}
                      handleClubUpdated={handleClubUpdated}
                    />
                  }
                />
                <Route path='/clublessons' element={<ViewClubLessons />} />
                <Route path = '/addlesson' element = {<AddLesson />} />
                <Route path = '/lesson/:id' element = {<Lesson />} />
                <Route path = '/gradelesson/:id' element = {<GradeStudentLesson />} />
                <Route path='/updatestudent/:id' element={<UpdateStudent />} />
                <Route
                  path='/studentpairselect'
                  element={<StudentPairSelect />}
                />
                <Route path='/studentpairings' element={<StudentPairings />} />
                <Route
                  path='games/in_progress/:id'
                  element={<ViewClubGames />}
                />
                <Route
                  path='/games/completed/:id'
                  element={<ViewCompletedGames />}
                />
                <Route path='/students/:id' element={<Student />} />
                <Route path='/viewlessons' element={<ViewLessons />} />
                <Route
                  path='/viewgamehistory/:id'
                  element={<ViewGameHistory />}
                />
                <Route path='/viewnotes' element={<ViewNotes />} />
                <Route path='/addnotes' element={<AddNotes />} />
                <Route
                  path='/confirmation_popup'
                  element={<ConfirmationPopUp />}
                />
              </>
            ) : (
              "hidden"
            )}
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
