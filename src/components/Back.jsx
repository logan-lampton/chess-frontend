import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Back({to, state}) {
  const navigate = useNavigate()  
  return (
    <button onClick = {()=>navigate(`${to}`, {state: state})}  className="bg-neutral-100 hover:bg-neutral-50 text-black font-bold py-2 px-4 border neutral-100 rounded absolute top-3.5 right-28">
      Back</button>
  )
}
