import type { Player } from '../types';
import { PointBalls } from '@/components/ui/point-balls';
import { useTresLogic } from '@/hooks';
import { cn, getNumberWithOrdinal } from '@/lib/utils';

type Props = {
  player: Player;
  isSelected?: boolean;
  onUpdateScore?: (id: string, score: number) => void;
  onSelect?: (id: string) => void;
};

export const PlayerDetail = ({ player, isSelected, onSelect }: Props) => {
  const { onUpdateScore } = useTresLogic();

  const handleSelect = () => {
    onSelect?.(player.id);
  };

  const handleUpdateScore = (score: number) => {
    onUpdateScore(player.id, score);
  };

  return (
    <div
      className={cn('text-primary rounded-lg p-4', {
        'border-primary border-1': isSelected,
        'bg-primary/10': !isSelected,
      })}
      onClick={handleSelect}>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <p
            className={cn(
              'font-bold h-10 w-auto rounded-full bg-primary text-snooker-overlay flex items-center justify-center px-3',
              {
                'bg-background/30': !isSelected,
              },
            )}>
            {getNumberWithOrdinal(player.order)}
          </p>
          <p
            className={cn('text-xl font-bold text-white', {
              'text-primary': !isSelected,
            })}>
            {player.name}{' '}
          </p>
        </div>
        {!isSelected && (
          <h2 className='text-primary font-bold text-3xl'>{player.score}</h2>
        )}
      </div>
      {isSelected && (
        <div className='mt-5'>
          <div
            className={cn(
              'border-1 border-primary/30 text-center py-3 mb-5 rounded-lg bg-snooker-overlay/30',
            )}>
            <h1 className={cn('text-6xl font-bold')}>{player.score}</h1>
            <p>Total Points</p>
          </div>
          <div
            className={cn('hidden', {
              block: isSelected,
            })}>
            <p className='text-sm font-bold mb-2'>Add Score:</p>
            <PointBalls onClick={handleUpdateScore} />

            <p className='text-sm font-bold mb-2'>Add Foul:</p>
            <PointBalls isFoulSection onClick={handleUpdateScore} />
          </div>
        </div>
      )}
    </div>
  );
};
