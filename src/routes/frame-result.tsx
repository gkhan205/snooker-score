import { Button } from '@/components/ui/button';
import type { Player } from '@/feature/tres';
import { useTresLogic } from '@/hooks';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ChartNoAxesColumn, CirclePlus, Play } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  frameNumber: number;
};

export const FrameResult = ({ frameNumber }: Props) => {
  const { activeGame, onClearGame } = useTresLogic();
  const navigate = useNavigate();

  const frameScore = useMemo(() => {
    if (!activeGame) return [];

    if (frameNumber === 1) return activeGame.frameOnePlayers;
    if (frameNumber === 2) return activeGame.matchEndScore || [];

    return [];
  }, [activeGame, frameNumber]);

  const loosers = useMemo(() => {
    if (!activeGame) return null;

    return activeGame.loosers.map((looser) => looser.id);
  }, [activeGame]);

  const handleNavigate = () => {
    if (frameNumber === 1) {
      navigate('/frame-scoring');
    } else {
      onClearGame();
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className='text-primary flex gap-2 mb-10 font-bold text-2xl items-center'>
        <ChartNoAxesColumn strokeWidth={4} /> Final Standings
      </h1>

      {frameNumber === 1 && (
        <>
          <div className='grid gap-2'>
            <div className='grid grid-cols-6 gap-1 text-primary uppercase font-bold text-sm'>
              <div className='ms-3'>#</div>
              <div className='col-span-3'>Player</div>
              <div className='text-right'>Score</div>
              <div className='text-right'>Result</div>
            </div>

            {frameScore.map((player: Player, index: number) => (
              <div
                className='grid grid-cols-6 gap-1 bg-snooker-overlay/70 rounded-lg p-4 text-white items-center font-bold border-1 border-snooker-muted/70'
                key={player.id}>
                <div>{index + 1}</div>
                <div className='col-span-3'>{player.name}</div>
                <div className='text-right'>{player.score}</div>
                <div
                  className={cn('text-right', {
                    'text-red-500': player.finalScore! < 0,
                  })}>
                  {player.finalScore}
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white p-4 font-bold text-sm rounded-lg my-10 flex items-center gap-3'>
            <div className='bg-primary h-10 w-10 rounded-full flex items-center justify-center text-white'>
              <ArrowUpDown size={16} className='text-black' />
            </div>
            <p>Players order will be reversed for Frame 2</p>
          </div>

          <Button
            className={cn('w-full text-background-dark py-5 h-[50px] mt-20')}
            onClick={handleNavigate}>
            <span className='mr-2 rounded-full h-6 w-6 bg-snooker-overlay text-primary p-2 flex items-center justify-center'>
              <Play size={8} />
            </span>
            <p className='uppercase font-bold'>Start Frame 2</p>
          </Button>
        </>
      )}

      {frameNumber === 2 && (
        <>
          <div className='grid gap-2'>
            <div className='grid grid-cols-7 gap-1 text-primary uppercase font-bold text-sm'>
              <div className='ms-3'>#</div>
              <div className='col-span-3'>Player</div>
              <div className='text-right'>F1</div>
              <div className='text-right'>F2</div>
              <div className='text-right'>TOTAL</div>
            </div>

            {frameScore.map((player: Player, index: number) => (
              <div
                className={cn(
                  'grid grid-cols-7 gap-1 bg-snooker-overlay/70 rounded-lg p-4 text-white items-center font-bold border-1 border-snooker-muted/70',
                  {
                    'bg-red-500/70 border-red-500/70': loosers?.includes(
                      player.id,
                    ),
                  },
                )}
                key={player.id}>
                <div>{index + 1}</div>
                <div className='col-span-3'>{player.name}</div>
                <div className='text-right'>{player?.frameOneScore}</div>
                <div className='text-right'>{player?.frameTwoScore}</div>
                <div className='text-right'>{player?.finalScore}</div>
              </div>
            ))}
          </div>

          <div className='bg-white p-4 font-bold text-sm rounded-lg my-10 flex items-center gap-3'>
            <p>
              <span className='text-red-500 mr-1'>
                {loosers
                  ?.map(
                    (looser: string) =>
                      frameScore.find((player: Player) => player.id === looser)
                        ?.name,
                  )
                  .join(' & ')}
              </span>
              lost in the match with{' '}
              {frameScore
                .filter((player: Player) => !loosers?.includes(player.id))
                .map((player: Player) => player.name)
                .join(', ')}{' '}
            </p>
          </div>

          <Button
            className={cn('w-full text-background-dark py-5 h-[50px] mt-20')}
            onClick={handleNavigate}>
            <CirclePlus size={8} />

            <p className='uppercase font-bold'>Start New Match</p>
          </Button>
        </>
      )}
    </div>
  );
};
