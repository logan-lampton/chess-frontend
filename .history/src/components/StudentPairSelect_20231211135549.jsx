import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function StudentPairSelect() {
  const location = useLocation();
  const { students } = location.state.club;
  const [studentsToCheck, setStudentsToCheck] = useState([]);

  useEffect(() => {
    setStudentsToCheck(students);
  });

  const handleCheckboxChange = (id) => {
    setStudentsToCheck((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  };

  return (
    <div className='max-w-screen-md justify-start'>
      <div className='bg-gray-900 text-white font-bold border mb-4'>
        <h1>Students to Pair</h1>
      </div>
      <div className='bg-gray-900 text-white font-bold border mb-4 rounded'>
        <h3>Please unselect any students you don't want to pair</h3>
      </div>
      <ul>
        {studentsToCheck.map((student) => (
          <li key={student.id} className='flex justify-between mb-2'>
            <div>{student.student_name}</div>
            <div className='ml-auto'>
              <input
                type='checkbox'
                checked={student.checked}
                onChange={() => handleCheckboxChange(student.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentPairSelect;
