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
        <div key={student.id} className='bg-gray-200 p-4 rounded-lg mr-4'>
          {student.student_name}
        </div>
      ))}
    </div>
  );
}

export default StudentPairings;
