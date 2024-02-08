import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function UnpairedPlayers({ players }) {
    console.log("unpaired", players)
  return (
    <div className='border-2 border-gray-900 mt-16 mb-16'>
      <div className='bg-gray-900 text-white font-bold text-center border mb-4'>
          <h1>Unpaired Players</h1>
      </div>
      <div className='text-center'>
        {players && (
          players.map((player, i) => (
            <Draggable key={player.id} draggableId={player.id.toString()} index={i}>
              {(provided) => (
                <div className='bg-gray-300 border-2 border-black ml-12 mr-12 mb-3' {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <h2>{player.student_name}</h2>
                </div>
              )}
            </Draggable>
          ))
        )}
      </div>
    </div>
  );
}
