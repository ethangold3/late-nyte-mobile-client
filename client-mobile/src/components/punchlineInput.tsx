import React, { useState, useEffect } from 'react';

const PunchlineInput = ({ prompt, timeLeft, onSubmit }) => {
  const [punchline, setPunchline] = useState('');

  useEffect(() => {
    if (timeLeft === 0) {
      onSubmit(punchline || "Time's up! No punchline submitted.");
    }
  }, [timeLeft, punchline, onSubmit]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Create a punchline:</h3>
      <p className="mb-4">{prompt.text}</p>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={punchline}
        onChange={(e) => setPunchline(e.target.value)}
        placeholder="Enter your punchline here..."
      />
      <p>Time left: {timeLeft} seconds</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onSubmit(punchline)}
        disabled={!punchline}
      >
        Submit Punchline
      </button>
    </div>
  );
};

export default PunchlineInput;