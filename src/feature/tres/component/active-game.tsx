import { format } from 'date-fns';
import type { GameData } from '../types';
import { Accordion } from '@/components/ui/accordion';
import { PlayerDetail } from './player-detail';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  activeGame: GameData;
  onUpdateScore?: (id: string, score: number) => void;
  onNextFrame?: () => void;
  onEndGame?: () => void;
};
export const ActiveGame = ({
  activeGame,
  onUpdateScore,
  onNextFrame,
  onEndGame,
}: Props) => {
  const players = useMemo(() => {
    return activeGame.currentFrame === 1
      ? activeGame.frameOnePlayers
      : activeGame.frameTwoPlayers;
  }, [
    activeGame.currentFrame,
    activeGame.frameOnePlayers,
    activeGame.frameTwoPlayers,
  ]);

  return (
    <div className='space-y-3 flex flex-col h-[calc(100vh-10rem)] justify-between'>
      <div>
        <h2>Active Game</h2>
        <p>Current Frame: {activeGame.currentFrame}</p>
        <p>Started At: {format(activeGame.startedAt, 'PPpp')}</p>
        <p>Players</p>
        <ul className='space-y-3'>
          <Accordion type='single' collapsible>
            {(players || []).map((player) => (
              <PlayerDetail
                key={player.id}
                player={player}
                onUpdateScore={onUpdateScore}
              />
            ))}
          </Accordion>
        </ul>
      </div>

      <div>
        {activeGame.currentFrame === 1 && (
          <Button variant='outline' onClick={onNextFrame}>
            End Frame 1
          </Button>
        )}
        {activeGame.currentFrame === 2 && (
          <Button onClick={onEndGame}>End Game</Button>
        )}
      </div>
    </div>
  );
};
