import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../App";
import Back from "./Back";

function StudentPairSelect() {
  const location = useLocation();
  const { clubId } = useUserContext()
  const { students } = location.state;
  console.log('students', students)
  const [renderedStudents, setRenderedStudents] = useState([]);
  const [pairedStudents, setPairedStudents] = useState([]);
  const [unpairedStudents, setUnpairedStudents] = useState([]);

  useEffect(() => {
    setRenderedStudents(
      students.map((student) => ({ ...student, checked: true }))
    );
    setPairedStudents(students);
  }, [students]);

  const handleCheckboxChange = (id) => {
    const updatedStudents = renderedStudents.map((student) =>
      student.id === id ? { ...student, checked: !student.checked } : student
    );
    setRenderedStudents(updatedStudents);

    const checkedStudents = updatedStudents.filter(
      (student) => student.checked
    );
    const uncheckedStudents = updatedStudents.filter(
      (student) => !student.checked
    );
    setPairedStudents(checkedStudents);
    setUnpairedStudents(uncheckedStudents);
  };

  console.log("paired students", pairedStudents);
  console.log("unpaired students", unpairedStudents);

  return (
    <>
    <Back to = {`/clubs/${clubId}`}/>
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
            {renderedStudents.map((student) => (
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
        {pairedStudents.length % 2 === 0 ? (
          <div>
            <Link
              to='/studentpairings'
              state={{
                paired: pairedStudents,
                unpaired: unpairedStudents,
                students: students
              }}
            >
              <button className='w-50 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 border bg-gray-900 rounded mb-4'>
                Proceed to Pairings
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <p className='bg-gray-300 text-black font-bold py-2 px-4 border rounded'>
              Please Select an Even Number of Students
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default StudentPairSelect;
