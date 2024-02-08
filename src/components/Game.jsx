import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
export default function Game({players, gamenum}) {
  return (
    <div>
        <div className='bg-gray-900 text-white font-bold py-2 px-4 border mb-4'>
            <h1>Game {gamenum +1}</h1>
        </div>
        <div className='flex mb-4'>
            <h2 className='ml-3'>White:</h2>
            <Draggable draggableId={players[0].id.toString()} index = {0} key = {players[0].id} >
                {(provided) => (
                    <div className='ml-3' {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                        <h2>{players[0].student_name}</h2>
                    </div>
                )}
            </Draggable>
        </div>
        <div className='flex mb-4'>
            <h2 className='ml-3'>Black:</h2>
            <Draggable draggableId={players[1].id.toString()} index = {1} key = {players[1].id} >
                {(provided) => (
                    <div className='ml-3' {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                        <h2>{players[1].student_name}</h2>
                    </div>
                )}
            </Draggable>
        </div>
    </div>
  )
}
