import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import PunchlineInput from './PunchlineInput';
import MobileVoting from './MobileVoting';
import MobileScoreboard from './MobileScoreboard';

const MobileGameScreen = ({ gameId, username }) => {
  const [gameState, setGameState] = useState('waiting');
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const socket = useSocket(gameId);

  useEffect(() => {
    if (socket) {
      socket.on('gameUpdate', (game) => {
        setGameState(game.status);
        if (game.status === 'in-progress') {
          const currentRound = game.rounds[game.currentRound - 1];
          const playerAssignment = currentRound.assignments.find(
            (a) => a.player === username
          );
          if (playerAssignment) {
            setCurrentPrompt(playerAssignment.prompts[0]);
            setTimeLeft(60);
          }
        }
      });

      socket.on('votingStart', ({ prompt }) => {
        setCurrentPrompt(prompt);
        setTimeLeft(30);
        setGameState('voting');
      });

      socket.on('roundEnd', () => {
        setGameState('scoreboard');
      });

      socket.on('gameOver', () => {
        setGameState('gameOver');
      });
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [socket, username]);

  const renderContent = () => {
    switch (gameState) {
      case 'waiting':
        return <p>Waiting for the game to start...</p>;
      case 'in-progress':
        return currentPrompt ? (
          <PunchlineInput
            prompt={currentPrompt}
            timeLeft={timeLeft}
            onSubmit={(punchline) => {
              socket.emit('submitPunchline', { gameId, username, promptId: currentPrompt._id, punchline });
            }}
          />
        ) : (
          <p>Waiting for your turn...</p>
        );
      case 'voting':
        return <MobileVoting prompt={currentPrompt} timeLeft={timeLeft} socket={socket} />;
      case 'scoreboard':
      case 'gameOver':
        return <MobileScoreboard gameId={gameId} isGameOver={gameState === 'gameOver'} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Late Nyte</h2>
      {renderContent()}
    </div>
  );
};

export default MobileGameScreen;