import { Card, CardContent } from '@/components/ui/card';
import type { GameData } from '../types';
import { format, differenceInMinutes } from 'date-fns';

type GamesListProps = {
  games: GameData[];
};

export const GamesList = ({ games }: GamesListProps) => {
  return (
    <div className='my-5'>
      <h2 className='text-xl font-bold border-b mb-5'>
        Today's Game List - {format(new Date(), 'cccc, dd MMM')}
      </h2>
      {games.length === 0 ? (
        <p>No games played today.</p>
      ) : (
        <div className='grid gap-3'>
          {games.map((game) => (
            <Card key={game.id}>
              <CardContent>
                <p>
                  Match Time: {format(new Date(game.startedAt), 'p')} -{' '}
                  {game.endedAt
                    ? format(new Date(game.endedAt), 'p')
                    : 'Ongoing'}
                </p>
                <p>
                  Duration:{' '}
                  {game.endedAt
                    ? differenceInMinutes(
                        new Date(game.endedAt),
                        new Date(game.startedAt),
                      )
                    : differenceInMinutes(
                        new Date(),
                        new Date(game.startedAt),
                      )}{' '}
                  minutes
                </p>
                <p>
                  Looser(s):{' '}
                  {game.loosers.map((looser) => looser.name).join(' & ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
