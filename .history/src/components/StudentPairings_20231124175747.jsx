import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Game from "./Game";

function StudentPairings() {
  const location = useLocation();
  const { students } = location.state.club.students;
  const [pairs, setPairs] = useState([]);

  function makePairs(arr) {
    const pairsArray = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairsArray.push(arr.slice(i, i + 2));
    }
    return pairsArray;
  }

  useEffect(() => setPairs(makePairs(students)), [students]);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
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

    const newPairs = [...pairs];
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
    setPairs(newPairs);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {pairs.map((pair, i) => (
        <Droppable droppableId={`${i}`} key={i}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Game players={pair} gamenum={i} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default StudentPairings;
