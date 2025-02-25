import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { webSocketService } from '../../services/websockets';
import PunchlineInput from '../../components/PunchlineInput';
import MobileVoting from '../../components/MobileVoting';
import MobileScoreboard from '../../components/MobileScoreboard';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState('waiting');
  const [currentPrompt, setCurrentPrompt] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const { id: gameId, username } = router.query;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (gameId) {
      const newSocket = webSocketService.connect(gameId as string);
      setSocket(newSocket);

      newSocket.on('gameUpdate', (game) => {
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

      newSocket.on('votingStart', ({ prompt }) => {
        setCurrentPrompt(prompt);
        setTimeLeft(30);
        setGameState('voting');
      });

      newSocket.on('roundEnd', () => {
        setGameState('scoreboard');
      });

      newSocket.on('gameOver', () => {
        setGameState('gameOver');
      });

      return () => {
        webSocketService.disconnect();
      };
    }
  }, [gameId, username]);

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
              socket?.emit('submitPunchline', { gameId, username, promptId: currentPrompt._id, punchline });
            }}
          />
        ) : (
          <p>Waiting for your turn...</p>
        );
      case 'voting':
        return <MobileVoting prompt={currentPrompt} timeLeft={timeLeft} socket={socket} />;
      case 'scoreboard':
      case 'gameOver':
        return <MobileScoreboard gameId={gameId as string} isGameOver={gameState === 'gameOver'} />;
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

export default Game;