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
    <div className='max-w-screen-md justify-start'>
      <div className='bg-gray-900 text-white font-bold border mb-4 ml-4'>
        <h1>Students to Pair</h1>
      </div>
      <div className='bg-gray-900 text-white font-bold border mb-4 rounded'>
        <h3>Please unselect any students you don't want to pair</h3>
      </div>
      <ul className=''>
        {studentsToCheck.map((student) => (
          <li key={student.id} className='flex items-center justify-start mb-2'>
            <div className='w-52'>{student.student_name}</div>
            <div className='ml-2'>
              <input type='checkbox' checked></input>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentPairSelect;
