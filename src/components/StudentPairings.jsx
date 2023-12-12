
import {React, useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { DragDropContext, Droppable} from 'react-beautiful-dnd'
import Game from './Game'
import UnpairedPlayers from './UnpairedPlayers'

function StudentPairings() {

  const location = useLocation()
  console.log("state", location.state)
  const { paired, unpaired } = location.state

  console.log("paired", paired)
  console.log("unpaired", unpaired)
  // const [pairs, setPairs] = useState({pairs:[], unpaired:[]})
  
  // function makePairs(arr){
  //   const pairsHash = {pairs:[], unpaired:[]}
  //   if (arr.length%2 === 0){
  //     for (let i = 0; i<arr.length; i+=2){
  //       pairsHash.pairs.push(arr.slice(i, i+2))
  //     }
  //     return pairsHash
  //   }
  //   else{
  //     for (let i = 0; i<arr.length-2; i+=2){
  //       pairsHash.pairs.push(arr.slice(i, i+2))
  //     }
  //     pairsHash.unpaired.push(arr[arr.length-1])
      
  //     return pairsHash
  //   }
  // }

  // useEffect(()=>setPairs(makePairs(students)), [students])

  // console.log(pairs)

  // function onDragEnd(result){
  //   const {destination, source, type} = result;
  //   console.log('result', result)
  //   if (!destination){
  //     return;
  //   }

  // //   if (
  // //     destination.droppableId === source.droppableId &&
  // //     destination.index === source.index
  // //   ) {
  // //     return;
  // //   }

  //     const newPairs = [...pairs.pairs];
  //     const sourceGameId = parseInt(source.droppableId);
  //     const destinationGameId = parseInt(destination.droppableId);
  //     const sourcePlayerIndex = source.index;
  //     const destinationPlayerIndex = destination.index>1?1:destination.index;
    
  //     // Check if source and destination are the same game
  //     if (sourceGameId === destinationGameId) {
  //       const game = newPairs[sourceGameId];
    
  //       // Insert players back into the same game
  //       game.unshift(game.pop());
  //     } else {
  //       // Remove the source player from the source game
  //       const sourceGame = newPairs[sourceGameId];
  //       const sourcePlayer = sourceGame.splice(sourcePlayerIndex, 1)[0];
    
  //       // Remove the destination player from the destination game
  //       const destinationGame = newPairs[destinationGameId];
  //       const destinationPlayer = destinationGame.splice(destinationPlayerIndex, 1)[0];
    
  //       // Insert the source player into the destination game
  //       destinationGame.splice(destinationPlayerIndex, 0, sourcePlayer);
    
  //       // Insert the destination player into the source game
  //       sourceGame.splice(sourcePlayerIndex, 0, destinationPlayer);
  //     }
    
  //     // Set the updated pairs state
  //     setPairs({...pairs, [pairs]:newPairs});
  // }
  
  return (
    <>
    </>
    // <DragDropContext onDragEnd={onDragEnd}>
    // {pairs.pairs.map((pair, i)=> (
    //   <Droppable droppableId = {`${i}`} key = {i} type = 'game'>
    //     {(provided) => (
    //       <div {...provided.droppableProps} ref = {provided.innerRef}>
    //         <Game players = {pair} gamenum = {i}/>
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    // ))}
    // <Droppable droppableId = 'unpaired' type = 'unpaired'>
    //       {(provided)=> (
    //         <div {...provided.droppableProps} ref = {provided.innerRef}>
    //           <UnpairedPlayers  players = {pairs.unpaired}/>
    //           {provided.placeholder}
    //         </div>
    //       )
    //       }
    // </Droppable>
    // </DragDropContext>
  )

}

export default StudentPairings;
