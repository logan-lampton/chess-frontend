
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
  const [pairs, setPairs] = useState({paired:[], unpaired:[]})
  
  function makePairs(arr1,arr2){
    const pairsHash = {paired:[], unpaired:[]}
      for (let i = 0; i<arr1.length; i+=2){
        pairsHash.paired.push(arr1.slice(i, i+2))
      }
      pairsHash.unpaired = arr2
      
      return pairsHash
    }

  useEffect(()=>setPairs(makePairs(paired, unpaired)), [paired])

  console.log(pairs)

  function onDragEnd(result){
    const {destination, source} = result;
    console.log('result', result)
    if (!destination){
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (
      destination.droppableId === 'unpaired' &&
      source.droppableId === 'unpaired'
    ){
      return;
    }
    //check if both players we are moving are paired
    if (source.droppableId !== 'unpaired' && destination.droppableId !== 'unpaired'){

      const newPairs = [...pairs.paired];
      const sourceGameId = parseInt(source.droppableId);
      const destinationGameId = parseInt(destination.droppableId);
      const sourcePlayerIndex = source.index;
      const destinationPlayerIndex = destination.index>1?1:destination.index;
    
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
        const destinationPlayer = destinationGame.splice(destinationPlayerIndex, 1)[0];
    
        // Insert the source player into the destination game
        destinationGame.splice(destinationPlayerIndex, 0, sourcePlayer);
    
        // Insert the destination player into the source game
        sourceGame.splice(sourcePlayerIndex, 0, destinationPlayer);
      }
    
      // Set the updated pairs state
      setPairs({...pairs, paired:newPairs});
    }
    //if one of the players is from the unpaired section
    else{
      const newPairs = {...pairs}
      //drag player from game to unpaired
      if (destination.droppableId == 'unpaired'){
        const destinationPlayerIndex = destination.index>=pairs.unpaired.length?pairs.unpaired.length-1:destination.index
        //remove player from source game
        const sourceGame = newPairs.paired[ parseInt(source.droppableId)]
        const sourcePlayer = sourceGame.splice(source.index, 1)[0];
        //remove player from unpaired section
        const destinationPlayer = newPairs.unpaired.splice(destinationPlayerIndex, 1)[0];
        //insert player into unpaired section
        newPairs.unpaired.splice(destinationPlayerIndex, 0, sourcePlayer)
        //insert player into source game
        sourceGame.splice(source.index, 0, destinationPlayer);

        console.log(newPairs)
        setPairs(newPairs)
      }
      //drag player from unpaired to game
      else if(source.droppableId === 'unpaired'){
        const destinationGameIndex = parseInt(destination.droppableId);
        const destinationPlayerIndex = destination.index>1?1:destination.index;
        //remove player from unpaired section
        const sourcePlayer = newPairs.unpaired.splice(source.index, 1)[0]
        //remove player from destination game
        const destinationGame = newPairs.paired[destinationGameIndex]
        const destinationPlayer = destinationGame.splice(destinationPlayerIndex, 1)[0]
        //insert player into unpaired section
        newPairs.unpaired.splice(source.index, 0, destinationPlayer)
        //insert player into destination game
        destinationGame.splice(destinationPlayerIndex, 0, sourcePlayer)

        console.log(newPairs)
        setPairs(newPairs)
      }
    }
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    {pairs.paired.map((pair, i)=> (
      <Droppable droppableId = {`${i}`} key = {i} >
        {(provided) => (
          <div {...provided.droppableProps} ref = {provided.innerRef}>
            <Game players = {pair} gamenum = {i}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ))}
    <Droppable droppableId = 'unpaired' >
          {(provided)=> (
            <div {...provided.droppableProps} ref = {provided.innerRef}>
              <UnpairedPlayers  players = {pairs.unpaired}/>
              {provided.placeholder}
            </div>
          )
          }
    </Droppable>
    </DragDropContext>
  )

}

export default StudentPairings;