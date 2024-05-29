import React from 'react'


export default function StudentScoreInput({student, score, onScoreChange, max}) {
    console.log(score)
    const handleScoreInputChange = e => {
        const newScore = parseInt(e.target.value)
        onScoreChange(student.id, newScore)
    }
    return (
        <div className="">
          <label htmlFor={`score-${student.id}`} className="block text-gray-700 p-2">
            {student.name}
          </label>
          <div className="flex p-1">
            <input
              type="number"
              id={`score-${student.id}`}
              value={score}
              onChange={handleScoreInputChange}
              min="0"
              max={max}
              className="p-2 block w-100 shadow-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-400"
            />
            <p className="mt-2 ml-2 text-gray-500">/{max}</p>
          </div>
          <button className="mt-5 bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700">Add Notes</button>
        </div>
      );
}
