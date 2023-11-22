import React from "react";
import { useLocation } from "react-router-dom";

function StudentPairings() {
  const location = useLocation();
  const { club } = location.state;

  const students = club.students || [];

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const pairedStudents = chunkArray(students, 2);

  const chunkPairsIntoSetsOfThree = (arr) => {
    const setsOfThree = [];
    for (let i = 0; i < arr.length; i += 3) {
      setsOfThree.push(arr.slice(i, i + 3));
    }
    return setsOfThree;
  };

  // Group pairs into sets of three
  const setsOfThree = chunkPairsIntoSetsOfThree(pairedStudents);

  return (
    <div className='flex flex-wrap justify-center'>
      {setsOfThree.map((set, index) => (
        <div key={index} className='flex mb-4'>
          {set.map((pair, pairIndex) => (
            <div key={pairIndex} className='flex mr-10'>
              <h2>Pair</h2>
              {pair.map((student, studentIndex) => (
                <div
                  key={student.id}
                  className='h-15 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded'
                >
                  {student.student_name}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StudentPairings;