import { Clock } from 'lucide-react';
import { ResultTable, type GameData } from '../tres';
import { differenceInMinutes, format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type Props = {
  game: GameData;
};

export const HistoryItem = ({ game }: Props) => {
  const tableData = game.matchEndScore || [];
  const loosersList = (game.loosers || []).map((looser) => looser.id);

  return (
    <div className='bg-primary/10 p-4 rounded-lg border border-primary/20 space-y-3'>
      <div className='text-xs text-primary flex items-center gap-1 font-bold'>
        <Clock size={12} />
        <p>
          {format(new Date(game.startedAt), 'p')} -{' '}
          {format(new Date(game?.endedAt || game.startedAt), 'p')}
        </p>

        <p>
          |{' '}
          {differenceInMinutes(
            new Date(game?.endedAt || game.startedAt),
            new Date(game.startedAt),
          )}{' '}
          minutes
        </p>
      </div>
      <p className='text-sm font-bold text-white'>
        {tableData.map((player) => player.name).join(' vs ')}
      </p>
      <p className='text-sm font-bold text-red-400'>
        Looser(s): {game.loosers.map((player) => player.name).join(', ')}{' '}
      </p>

      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className={cn('text-primary font-bold')}>
            View Details
          </AccordionTrigger>
          <AccordionContent>
            <ResultTable
              frameNumber={2}
              data={tableData}
              loosers={loosersList}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
