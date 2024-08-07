import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Game from "./Game";
import UnpairedPlayers from "./UnpairedPlayers";
import axios from "../axiosConfig";
import { useUserContext } from "../App";
import Back from "./Back";

function StudentPairings() {
  const location = useLocation();
  console.log("state", location.state);
  const { clubId } = useUserContext()
  const { paired, unpaired, students } = location.state;
  const navigate = useNavigate();

  console.log("paired", paired);
  console.log("unpaired", unpaired);
  const [pairs, setPairs] = useState({ paired: [], unpaired: [] });

  function makePairs(arr1, arr2) {
    const pairsHash = { paired: [], unpaired: [] };
    for (let i = 0; i < arr1.length; i += 2) {
      pairsHash.paired.push(arr1.slice(i, i + 2));
    }
    pairsHash.unpaired = arr2;

    return pairsHash;
  }

  useEffect(() => setPairs(makePairs(paired, unpaired)), [paired]);

  console.log(pairs);

  function shufflePlayers() {
    //flatten array of games
    const newArray = pairs.paired.flat();

    // Fisher-Yates (Knuth) Shuffle Algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    setPairs(makePairs(newArray, pairs.unpaired));
  }

  function pairByTotalWins() {
    const newArray = pairs.paired.flat();
    newArray.sort((a, b) => b.total_wins - a.total_wins);
    setPairs(makePairs(newArray, pairs.unpaired));
  }

  function pairByWinPercent() {
    const newArray = pairs.paired.flat();
    newArray.sort((a, b) => b.win_rate - a.win_rate);
    setPairs(makePairs(newArray, pairs.unpaired));
  }

  function onDragEnd(result) {
    const { destination, source } = result;
    console.log("result", result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (
      destination.droppableId === "unpaired" &&
      source.droppableId === "unpaired"
    ) {
      return;
    }
    //check if both players we are moving are paired
    if (
      source.droppableId !== "unpaired" &&
      destination.droppableId !== "unpaired"
    ) {
      const newPairs = [...pairs.paired];
      const sourceGameId = parseInt(source.droppableId);
      const destinationGameId = parseInt(destination.droppableId);
      const sourcePlayerIndex = source.index;
      const destinationPlayerIndex =
        destination.index > 1 ? 1 : destination.index;

      // Check if source and destination are the same game
      if (sourceGameId === destinationGameId) {
        const game = newPairs[sourceGameId];

        // Insert players back into the same game
        game.unshift(game.pop());
      } else {
        // Remove the source player from the source game
        const sourceGame = newPairs[sourceGameId];
        const sourcePlayer = sourceGame.splice(sourcePlayerIndex, 1)[0];

        // Remove the destination player from the destination game
        const destinationGame = newPairs[destinationGameId];
        const destinationPlayer = destinationGame.splice(
          destinationPlayerIndex,
          1
        )[0];

        // Insert the source player into the destination game
        destinationGame.splice(destinationPlayerIndex, 0, sourcePlayer);

        // Insert the destination player into the source game
        sourceGame.splice(sourcePlayerIndex, 0, destinationPlayer);
      }

      // Set the updated pairs state
      setPairs({ ...pairs, paired: newPairs });
    }
    //if one of the players is from the unpaired section
    else {
      const newPairs = { ...pairs };
      //drag player from game to unpaired
      if (destination.droppableId == "unpaired") {
        const destinationPlayerIndex =
          destination.index >= pairs.unpaired.length
            ? pairs.unpaired.length - 1
            : destination.index;
        //remove player from source game
        const sourceGame = newPairs.paired[parseInt(source.droppableId)];
        const sourcePlayer = sourceGame.splice(source.index, 1)[0];
        //remove player from unpaired section
        const destinationPlayer = newPairs.unpaired.splice(
          destinationPlayerIndex,
          1
        )[0];
        //insert player into unpaired section
        newPairs.unpaired.splice(destinationPlayerIndex, 0, sourcePlayer);
        //insert player into source game
        sourceGame.splice(source.index, 0, destinationPlayer);

        console.log(newPairs);
        setPairs(newPairs);
      }
      //drag player from unpaired to game
      else if (source.droppableId === "unpaired") {
        const destinationGameIndex = parseInt(destination.droppableId);
        const destinationPlayerIndex =
          destination.index > 1 ? 1 : destination.index;
        //remove player from unpaired section
        const sourcePlayer = newPairs.unpaired.splice(source.index, 1)[0];
        //remove player from destination game
        const destinationGame = newPairs.paired[destinationGameIndex];
        const destinationPlayer = destinationGame.splice(
          destinationPlayerIndex,
          1
        )[0];
        //insert player into unpaired section
        newPairs.unpaired.splice(source.index, 0, destinationPlayer);
        //insert player into destination game
        destinationGame.splice(destinationPlayerIndex, 0, sourcePlayer);

        console.log(newPairs);
        setPairs(newPairs);
      }
    }
  }

  const handleCreateGames = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/games",
        { games: pairs.paired },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate(`/games/completed/${clubId}`);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;

        if (validationErrors) {
          console.log("Validation errors:", validationErrors);
        } else {
          console.log(
            "Unexpected validation response format:",
            error.response.data
          );
        }
      } else {
        console.log("Error creating games", error);
      }
    }
  };

  return (
    <>
    <Back  to = {`/studentpairselect`} state = {{students: students}} />
      <button onClick={shufflePlayers}>pair randomly</button>
      <button onClick={pairByTotalWins}>pair by total wins</button>
      <button onClick={pairByWinPercent}>pair by winning percentage</button>
      <button
        onClick={handleCreateGames}
        className='h-30 w-50 bg-green-600 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mt-10 mb-10'
      >
        <h2>Confirm Matchups</h2>
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-4 gap-16 mt-8'>
          {pairs.paired.map((pair, i) => (
            <Droppable droppableId={`${i}`} key={i}>
              {(provided) => (
                <div
                  className='border-2 border-gray-900'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Game players={pair} gamenum={i} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
        <div>
          <Droppable droppableId='unpaired'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <UnpairedPlayers players={pairs.unpaired} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default StudentPairings;
