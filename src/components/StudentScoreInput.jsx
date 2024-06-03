import React, { useState } from 'react';

export default function StudentScoreInput({ student, score, note, onScoreChange, onNoteChange, max }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleScoreInputChange = e => {
    const newScore = e.target.value;
    onScoreChange(student.id, newScore);
  };

  const handleNoteChange = e => {
    const newNote = e.target.value;
    onNoteChange(student.id, newNote);
  };

  const toggle = () => {
    setIsToggled(prevState => !prevState);
  };

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
      {!isToggled ? (
        <button className="mt-5 bg-gray-900 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={toggle}>
          Add Notes
        </button>
      ) : (
        <div>
          <div className="mt-5">
            <textarea
              style={{ resize: "none", height: "auto", minHeight: "2rem", width: "100%", overflowY: "hidden" }}
              value={note}
              onChange={handleNoteChange}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = (e.target.scrollHeight) + "px";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}