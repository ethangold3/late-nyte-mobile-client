import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleCreateGame = async () => {
    // TODO: Implement API call to create a game
    const newGameId = 'ABCD'; // This should come from your API
    router.push(`/game/${newGameId}`);
  };

  const handleJoinGame = () => {
    if (gameId && playerName) {
      router.push(`/game/${gameId}?name=${playerName}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Late Nyte</h1>
      <button
        onClick={handleCreateGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Game
      </button>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Your Name"
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={handleJoinGame}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;