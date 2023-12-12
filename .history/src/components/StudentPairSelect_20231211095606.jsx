import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function StudentPairSelect() {
  const location = useLocation();
  const { students } = location.state.club;
  const [studentsToCheck, setStudentsToCheck] = useState([]);

  useEffect(() => {
    setStudentsToCheck(students);
  });

  return (
  <>
    {studentsToCheck ? (
        <ul className='ml-5'>
        {studentsToCheck.map((student)=>(<li key={student.id} >))
        }
        </ul>
    )}
    
  </>
  );
}

export default StudentPairSelect;
