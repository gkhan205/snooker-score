import { DateFilters } from '@/components/wrappers';
import { HistoryItem } from '@/feature/history';
import type { GameData } from '@/feature/tres';
import { useTresLogic } from '@/hooks';
import { useState } from 'react';

export const History = () => {
  const { allGamesToday, onFilterByDate } = useTresLogic();
  const [filteredGames, setFilteredGames] = useState<GameData[]>(allGamesToday);

  const handleDateSelect = (date: Date) => {
    const filtered = onFilterByDate(date);
    setFilteredGames(filtered);
  };

  return (
    <>
      <DateFilters onSelect={handleDateSelect} />

      <div className='flex items-center justify-between'>
        <h1 className='text-snooker-muted uppercase font-bold'>Games Today</h1>
        <div className='bg-primary/20 text-primary font-bold text-xs p-2 rounded-lg'>
          <p>{filteredGames.length} Games Played</p>
        </div>
      </div>

      {filteredGames.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-snooker-muted text-2xl'>No games played...</p>
        </div>
      )}

      <div className='grid gap-4 my-5'>
        {filteredGames.map((game) => (
          <HistoryItem key={game.id} game={game} />
        ))}
      </div>
    </>
  );
};
