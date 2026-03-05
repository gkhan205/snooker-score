import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export const Header = ({
  name = 'FrameScore',
  isMainHeader = false,
}: {
  name?: string;
  isMainHeader?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn('w-full h-16 p-4 border-b border-primary/30', {
        'flex items-center gap-5': !isMainHeader,
      })}>
      {!isMainHeader && (
        <button
          className='text-primary cursor-pointer'
          onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
      )}
      <h1
        className={cn('font-bold text-snooker-gold text-center', {
          'uppercase text-2xl': isMainHeader,
          'text-white text-xl': !isMainHeader,
        })}>
        {name}
      </h1>
    </header>
  );
};
