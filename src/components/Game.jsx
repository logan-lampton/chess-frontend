import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
export default function Game({players, gamenum}) {
    console.log("games", players)
  return (
    <div>
        <h1>Game {gamenum +1}</h1>
        <h2>White:</h2>
        <Draggable draggableId={players[0].id.toString()} index = {0} key = {players[0].id} >
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                <h4>{players[0].student_name}</h4>
                </div>
            )}
        </Draggable>
        <h2>Black:</h2>
        <Draggable draggableId={players[1].id.toString()} index = {1} key = {players[1].id} >
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                <h4>{players[1].student_name}</h4>
                </div>
            )}
        </Draggable>
    </div>
  )
}
