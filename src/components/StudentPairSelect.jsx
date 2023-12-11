import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function StudentPairSelect() {
  const location = useLocation();
  const { students } = location.state.club;
  const [studentsToCheck, setStudentsToCheck] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState([]);

  useEffect(() => {
    setStudentsToCheck(
      students.map((student) => ({ ...student, checked: true }))
    );
    setCheckedStudents(students)
  }, [students]);

  const handleCheckboxChange = (id) => {
    const updatedStudents = studentsToCheck.map((student) => student.id === id ? { ...student, checked: !student.checked } : student
    );
    setStudentsToCheck(updatedStudents);

    const checked = updatedStudents.filter((student) => student.checked);
    setCheckedStudents(checked);
  };

  console.log("checked students", checkedStudents);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4 w-screen'>
      <div className='col-span-2 md:col-span-2 mr-5 ml-5'>
      <div className='bg-gray-900 text-white font-bold border mb-4'>
        <h1>Students to Pair</h1>
      </div>
      <div className='bg-gray-900 text-white font-bold border mb-4 rounded'>
        <h3>Please unselect any students you don't want to pair</h3>
      </div>
            <div>
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
        </div>
        <div className='col-span-1 md:col-span-1 mr-5'>
            <div>
                <Link to='/studentpairings' state={{ checkedStudents: checkedStudents }}>
                    <button className='h-20 w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                    Pair Students
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default StudentPairSelect;
