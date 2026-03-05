import { Button } from '@/components/ui/button';
import { PlayerDetail, type Player } from '@/feature/tres';
import { useTresLogic } from '@/hooks';
import { cn } from '@/lib/utils';
import { Check, Flag } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const FrameScoring = () => {
  const navigate = useNavigate();
  const { players, activeGame, onNextFrame, onEndGame } = useTresLogic();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
    players[0]?.id || null,
  );

  const handleNextFrame = () => {
    onNextFrame();
    navigate('/frame-result');
  };

  const handleEndMatch = () => {
    onEndGame();
    navigate('/frame-result');
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='space-y-3 h-[calc(100vh-100px)] overflow-y-auto'>
        {(players || []).map((player: Player) => (
          <PlayerDetail
            key={player.id}
            player={player}
            isSelected={player.id === selectedPlayerId}
            onSelect={setSelectedPlayerId}
          />
        ))}
      </div>

      {activeGame?.currentFrame === 1 ? (
        <Button
          className={cn('w-full text-background-dark py-5 h-[50px] mt-5')}
          onClick={handleNextFrame}>
          <span className='mr-2 rounded-full h-6 w-6 bg-snooker-overlay text-primary p-2 flex items-center justify-center'>
            <Check size={8} />
          </span>
          <p className='uppercase font-bold'>End Frame 1</p>
        </Button>
      ) : (
        <Button
          className={cn('w-full text-background-dark py-5 h-[50px] mt-5')}
          onClick={handleEndMatch}>
          <span className='mr-2'>
            <Flag size={8} />
          </span>
          <p className='uppercase font-bold'>End Frame 2 & View Results</p>
        </Button>
      )}
    </div>
  );
};
