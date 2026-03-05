import { useTresLogic } from '@/hooks';
import { LandPlot, ListOrdered, PlayIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const NUMBER_OF_PLAYERS_OPTIONS = [3, 4, 5];

export const TresMatchMain = () => {
  const { numberOfPlayers, onSetNumberOfPlayers } = useTresLogic();
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/player-setup');
  };

  return (
    <div className='mt-10'>
      <div className='mb-10 flex flex-col items-center gap-1'>
        <LandPlot size={90} className='text-primary' />
        <h1 className='text-primary text-5xl font-bold tracking-tighter mb-2 italic'>
          FrameScore
        </h1>
        <p className='text-slate-300 text-sm font-medium tracking-wide uppercase'>
          Precision Tres Score Tracking
        </p>
      </div>

      <div className='flex flex-col gap-4 mb-10'>
        <button
          onClick={handleStartGame}
          className='flex w-full cursor-pointer items-center justify-center rounded-xl h-16 bg-primary text-background-dark text-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform'>
          <span className='mr-2 rounded-full bg-snooker-overlay p-2 flex items-center justify-center'>
            <PlayIcon size={14} fill='#ecb613' stroke='#ecb613' />
          </span>
          Start New Game
        </button>
      </div>

      <div className='space-y-4'>
        <h4 className='text-primary/80 text-xs font-bold uppercase tracking-[0.2em] text-center'>
          Select Players
        </h4>
        <div className='flex p-1.5 bg-snooker-table/60 backdrop-blur-md rounded-xl border border-white/10'>
          {NUMBER_OF_PLAYERS_OPTIONS.map((num) => (
            <button
              key={num}
              className={`flex-1 py-3 px-4 cursor-pointer rounded-lg font-bold text-lg shadow-inner ${
                numberOfPlayers === num
                  ? 'bg-primary text-background-dark'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
              onClick={() => onSetNumberOfPlayers(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className='p-4 mt-10 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm'>
        <div className='flex items-center justify-between text-slate-300 text-sm'>
          <span className='flex items-center gap-2'>
            <span className='text-primary text-base'>
              <ListOrdered />
            </span>
            Game Mode
          </span>
          <span className='font-bold text-slate-100'>2 Frames</span>
        </div>
      </div>
    </div>
  );
};
