import React from 'react'


export default function StudentScoreInput({student, score, onScoreChange, max}) {
    const handleScoreInputChange = e => {
        const newScore = parseInt(e.target.value)
        onScoreChange(student.id, newScore)
    }
  return (
    <div>
        <label htmlFor={`score-${student.id}`}>{student.name}</label>
        <input
            type="number"
            id={`score-${student.id}`}
            value={score}
            onChange={handleScoreInputChange}
            min="0"
            max={max}
      />
      /{max}
    </div>
  )
}
