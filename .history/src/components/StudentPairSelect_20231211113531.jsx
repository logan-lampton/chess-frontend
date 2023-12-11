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
    <div className=''>
      <div className='bg-gray-900 text-white font-bold border mb-4'>
        <h1>Students to Pair</h1>
      </div>
      <h3>Please unselect any student you don't want to pair</h3>
      <ul className='ml-10'>
        {studentsToCheck.map((student) => (
          <li key={student.id}>{student.student_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentPairSelect;