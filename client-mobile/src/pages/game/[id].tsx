import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const GamePage = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const [gameState, setGameState] = useState('waiting');
  const [prompt, setPrompt] = useState('');
  const [punchline, setPunchline] = useState('');

  useEffect(() => {
    // TODO: Implement WebSocket connection to get real-time game updates
  }, [id]);

  const handleSubmitPunchline = async () => {
    // TODO: Implement API call to submit punchline
    setGameState('waiting');
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'waiting':
        return <p>Waiting for the next round...</p>;
      case 'prompt':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">{prompt}</h2>
            <textarea
              value={punchline}
              onChange={(e) => setPunchline(e.target.value)}
              className="w-full p-2 border rounded"
              rows={4}
            />
            <button
              onClick={handleSubmitPunchline}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Punchline
            </button>
          </div>
        );
      case 'voting':
        return <p>Time to vote!</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Game: {id}</h1>
      <p className="mb-4">Player: {name}</p>
      {renderGameContent()}
    </div>
  );
};

export default GamePage;