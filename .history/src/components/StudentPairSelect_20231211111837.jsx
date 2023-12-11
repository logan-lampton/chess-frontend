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
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='border-2 border-gray-900'>
        <ul className='ml-5'>
          {studentsToCheck.map((student) => (
            <li key={student.id}>{student.student_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentPairSelect;
