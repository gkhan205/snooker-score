import { Button } from '@/components/ui/button';
import { PlayerForm, useTresLogic } from '@/feature/tres';
import { cn } from '@/lib/utils';
import { CircleX, PlayIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export const PlayerSetup = () => {
  const { players, numberOfPlayers, onAddPlayer, onStartGame, onRemovePlayer } =
    useTresLogic();
  const navigate = useNavigate();

  const handleGameStart = () => {
    onStartGame();
    navigate('/frame-scoring');
  };

  return (
    <>
      <div className='flex text-sm items-center justify-between bg-primary/10 p-3 rounded-lg border-primary border-1 mb-10'>
        <div>
          <p className='text-primary font-bold'>Game Mode</p>
          <p className='text-white'>{numberOfPlayers} Players, 2 Frames</p>
        </div>
        <div className='rounded-full bg-primary py-2 px-8 font-bold'>TRES</div>
      </div>

      <h1 className='text-white text-2xl mb-3 font-bold'>Order Of Play</h1>

      <div className='space-y-5 mb-5'>
        {players.map((player) => (
          <div
            key={player.id}
            className='border-1 shadow border-primary p-2 py-3 rounded-lg bg-snooker-overlay flex items-center justify-between gap-4'>
            <div className='flex items-center justify-between gap-3'>
              <div className='bg-primary text-white font-bold h-8 w-8 rounded flex items-center justify-center'>
                {player.order}
              </div>
              <p className='text-white text-lg font-bold'>{player.name}</p>
            </div>
            <Button
              variant='destructive'
              onClick={() => onRemovePlayer(player.id)}>
              <CircleX />
            </Button>
          </div>
        ))}
      </div>

      {numberOfPlayers !== players.length && (
        <PlayerForm onAddPlayer={onAddPlayer} />
      )}

      <Button
        className={cn('w-full text-background-dark py-5 h-[50px] mt-20')}
        disabled={players.length < numberOfPlayers}
        onClick={handleGameStart}>
        <p className='uppercase font-bold'>Start Frame 1</p>
        <span className='ms-2 rounded-full h-6 w-6 bg-snooker-overlay p-2 flex items-center justify-center'>
          <PlayIcon size={8} fill='#ecb613' stroke='#ecb613' />
        </span>
      </Button>
    </>
  );
};
