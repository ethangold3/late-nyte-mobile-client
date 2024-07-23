import React from 'react';

const MobileVoting = ({ prompt, timeLeft, socket }) => {
  const handleVote = (punchlineId) => {
    socket.emit('submitVote', { punchlineId });
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Vote for the best punchline!</h3>
      <p className="mb-4">{prompt.text}</p>
      {prompt.punchlines.map((punchline, index) => (
        <button
          key={index}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
          onClick={() => handleVote(punchline._id)}
        >
          {punchline.text}
        </button>
      ))}
      <p>Time left: {timeLeft} seconds</p>
    </div>
  );
};

export default MobileVoting;