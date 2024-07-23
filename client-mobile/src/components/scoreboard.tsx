import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const MobileScoreboard = ({ gameId, isGameOver }) => {
  const [players, setPlayers] = useState([]);
  const socket = useSocket(gameId);

  useEffect(() => {
    if (socket) {
      socket.on('gameUpdate', (game) => {
        setPlayers(game.players);
      });
    }
  }, [socket]);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">
        {isGameOver ? "Final Scores" : "Current Scores"}
      </h3>
      <ul>
        {sortedPlayers.map((player, index) => (
          <li key={player.username} className="mb-2">
            {index + 1}. {player.username}: {player.score} points
          </li>
        ))}
      </ul>
      {isGameOver && (
        <p className="mt-4 text-lg font-bold">
          Winner: {sortedPlayers[0].username}!
        </p>
      )}
    </div>
  );
};

export default MobileScoreboard;