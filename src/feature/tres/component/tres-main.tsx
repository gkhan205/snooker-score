import { useTresLogic } from '@/hooks';
import { PlayerForm } from './player-form';
import { Button } from '@/components/ui/button';
import { ActiveGame } from './active-game';
import { GamesList } from './games-list';
import { Trash } from 'lucide-react';

export const TresMain = () => {
  const {
    players,
    activeGame,
    allGamesToday,
    onAddPlayer,
    onStartGame,
    onUpdateScore,
    onNextFrame,
    onEndGame,
    onRemovePlayer,
  } = useTresLogic();

  return (
    <div>
      {activeGame ? (
        <ActiveGame
          activeGame={activeGame}
          onUpdateScore={onUpdateScore}
          onNextFrame={onNextFrame}
          onEndGame={onEndGame}
        />
      ) : (
        <>
          <div className='mb-5'>
            <p>New Match</p>
            {players.map((player, index: number) => (
              <div
                key={player.id}
                className='flex gap-2 items-center justify-between mb-2'>
                <p>
                  {index + 1}. {player.name}
                </p>
                <Button
                  variant='destructive'
                  onClick={() => onRemovePlayer(player.id)}>
                  <Trash />
                </Button>
              </div>
            ))}
          </div>

          {players.length < 5 && (
            <div className='border-t my-5 pt-5'>
              <h1>Add Player</h1>
              <PlayerForm onAddPlayer={onAddPlayer} />
            </div>
          )}
        </>
      )}

      {!activeGame && (
        <Button disabled={players.length < 2} onClick={onStartGame}>
          Start Game
        </Button>
      )}

      {!activeGame && <GamesList games={allGamesToday} />}
    </div>
  );
};
