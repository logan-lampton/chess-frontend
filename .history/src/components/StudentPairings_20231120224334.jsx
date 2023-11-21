import React from "react";
import { useLocation } from "react-router-dom";

function StudentPairings() {
  const location = useLocation();
  const { club } = location.state;

  const students = club.students || [];

  console.log(club);

  return (
    <div className='flex justify-center'>
      {students.map((student) => (
        <div
          key={student.id}
          className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'
        >
          {student.student_name}
        </div>
      ))}
    </div>
  );
}

export default StudentPairings;
