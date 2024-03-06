import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import ConfirmationPopUp from "./ConfirmationPopUp";

function Home({ clubs = [], handleClubDeleted, instructorId }) {
  const [confirmationPopUp, setConfirmationPopUp] = useState({
    message: "",
    isLoading: false,
  });

  const deleteClub = async (clubId) => {
    const token = localStorage.getItem("token");
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:3000/clubs/${clubId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Club deleted:", deleteResponse.data);

      handleClubDeleted(clubId);
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const clubRef = useRef();

  const handleConfirmation = (message, isLoading) => {
    setConfirmationPopUp({
      message,
      isLoading,
    });
  };

  const handleDeleteClick = (id) => {
    handleConfirmation("Are you sure you want to delete?", true);
    clubRef.current = id;
  };

  const sureDelete = async (selection, id) => {
    console.log("Club ID to delete: ", id);
    if (selection) {
      await deleteClub(clubRef.current);
      setConfirmationPopUp({ message: "", isLoading: false });
    } else {
      setConfirmationPopUp({ message: "", isLoading: false });
    }
  };

  return (
    <div className='h-screen bg-gray-100'>
      <div className='grid grid-cols-2 gap-20 content-around w-screen flex items-center px-10 mt-20'>
        {clubs.map((club) => (
          <div
            key={club.id}
            className='border-1 border-gray-900 w-full flex items-center'
          >
            <Link
              to={`/clubs/${club.id}`}
              state={{ club: club }}
              className='w-3/4'
            >
              <div className='bg-gray-900 text-white font-bold py-2 px-4 border hover:bg-gray-700'>
                <h2>{club.club_name}</h2>
              </div>
            </Link>
            <button
              onClick={() => handleDeleteClick(club.id)}
              className='w-1/4 bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 border bg-gray-900 rounded mr-4'
            >
              Delete Club
            </button>
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 right-0 p-5'>
        <Link to={"/addclub"} state={{ instructorId: instructorId }}>
          <button className='h-20 w-50 bg-green-600 hover:bg-green-400 text-white font-bold border bg-gray-900 rounded mr-4'>
            Add Club
          </button>
        </Link>
      </div>
      {confirmationPopUp.isLoading && (
        <ConfirmationPopUp
          onDialogue={sureDelete}
          message={confirmationPopUp.message}
        />
      )}
    </div>
  );
}

export default Home;
