import { HistoryItem } from '@/feature/history';
import { useTresLogic } from '@/hooks';

export const History = () => {
  const { allGamesToday } = useTresLogic();

  console.log(allGamesToday);

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-snooker-muted uppercase font-bold'>Games Today</h1>
        <div className='bg-primary/20 text-primary font-bold text-xs p-2 rounded-lg'>
          <p>{allGamesToday.length} Games Played</p>
        </div>
      </div>

      <div className='grid gap-4 my-5'>
        {allGamesToday.map((game) => (
          <HistoryItem key={game.id} game={game} />
        ))}
      </div>
    </>
  );
};
