import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Back({to, state}) {
  const navigate = useNavigate()  
  return (
    <button onClick = {()=>navigate(`${to}`, {state: state})}  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
    style={{ fontSize: '14px' }} >Back</button>
  )
}
