import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { joinGame } from '../services/api';

const HomePage = () => {
  const [gameId, setGameId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleJoinGame = async () => {
    if (!gameId || !username) {
      setError('Please enter both Game ID and Username');
      return;
    }

    try {
      const response = await joinGame(gameId, username);
      if (response.message === 'Joined game successfully') {
        router.push(`/game/${gameId}?username=${username}`);
      }
    } catch (err) {
      setError('Failed to join game. Please check the Game ID and try again.');
      console.error('Error joining game:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Late Nyte Mobile</h1>
      <input
        type="text"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        placeholder="Enter Game ID"
        className="mb-4 p-2 border rounded"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Your Name"
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleJoinGame}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Join Game
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HomePage;