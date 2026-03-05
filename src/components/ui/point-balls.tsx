import { BALL_COLORS } from '@/constants';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const blackTextColors = ['yellow', 'pink'] as const;

type Props = {
  onClick?: (score: number) => void;
  isFoulSection?: boolean;
};

export const PointBalls = ({ onClick, isFoulSection = false }: Props) => {
  const handleClick = (score: number) => () => {
    if (onClick) {
      const finalScore = isFoulSection ? -score : score;
      onClick(finalScore);
    }
  };

  const colors = useMemo(() => {
    if (!isFoulSection) return BALL_COLORS;

    return BALL_COLORS.slice(3);
  }, [isFoulSection]);

  return (
    <div className='flex flex-wrap gap-3 mb-5'>
      {colors.map((color) => (
        <button
          key={color.name}
          className={cn(
            'w-10 h-10 border rounded-full font-bold shadow-lg flex items-center justify-center text-white',
            {
              'text-black': blackTextColors.includes(
                color.name as (typeof blackTextColors)[number],
              ),
            },
          )}
          style={{ backgroundColor: color.name, borderColor: color.name }}
          onClick={handleClick(color.points)}>
          {color.points}
        </button>
      ))}
    </div>
  );
};
