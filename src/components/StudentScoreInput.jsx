import React from 'react'


export default function StudentScoreInput({student, score, onScoreChange, max}) {
    console.log(score)
    const handleScoreInputChange = e => {
        const newScore = parseInt(e.target.value)
        onScoreChange(student.id, newScore)
    }
    return (
        <div className="mb-4">
          <label htmlFor={`score-${student.id}`} className="block text-sm font-medium text-gray-700">
            {student.name}
          </label>
          <input
            type="number"
            id={`score-${student.id}`}
            value={score}
            onChange={handleScoreInputChange}
            min="0"
            max={max}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-400"
          />
          <span className="text-xs text-gray-500">/{max}</span>
        </div>
      );
}
