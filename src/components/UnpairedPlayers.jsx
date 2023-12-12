import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function UnpairedPlayers({ players }) {
    console.log("unpaired", players)
  return (
    <div>
        <h3>Unpaired Players:</h3>
      {players && (
        players.map((player, i) => (
          <Draggable key={player.id} draggableId={player.id.toString()} index={i}>
            {(provided) => (
              <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                <h4>{player.student_name}</h4>
              </div>
            )}
          </Draggable>
        ))
      )}
    </div>
  );
}
