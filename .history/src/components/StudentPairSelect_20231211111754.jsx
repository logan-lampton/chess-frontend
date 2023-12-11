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
    <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
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
