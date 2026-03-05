import { cn } from '@/lib/utils';
import type { Player } from '../types';

type Props = {
  frameNumber: number;
  data: Player[];
  loosers?: string[] | null;
};

export const ResultTable = ({ frameNumber, data, loosers }: Props) => {
  if (frameNumber === 1) {
    return (
      <div className='grid gap-2'>
        <div className='grid grid-cols-6 gap-1 text-primary uppercase font-bold text-sm'>
          <div className='ms-3'>#</div>
          <div className='col-span-3'>Player</div>
          <div className='text-right'>Score</div>
          <div className='text-right'>Result</div>
        </div>

        {data.map((player: Player, index: number) => (
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
    );
  }

  if (frameNumber === 2) {
    return (
      <div className='grid gap-2'>
        <div className='grid grid-cols-7 gap-1 text-primary uppercase font-bold text-sm'>
          <div className='ms-3'>#</div>
          <div className='col-span-3'>Player</div>
          <div className='text-right'>F1</div>
          <div className='text-right mr-2'>F2</div>
          <div className='text-right'>TOTAL</div>
        </div>

        {data.map((player: Player, index: number) => (
          <div
            className={cn(
              'grid grid-cols-7 gap-1 bg-snooker-overlay/70 rounded-lg p-4 text-white items-center font-bold border-1 border-snooker-muted/70',
              {
                'bg-red-500/70 border-red-500/70': loosers?.includes(player.id),
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
    );
  }

  return null;
};
