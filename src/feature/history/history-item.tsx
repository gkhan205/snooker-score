import { Clock } from 'lucide-react';
import { ResultTable, type GameData } from '../tres';
import { differenceInMinutes, format } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { calculateCost, cn, currencyFormatter } from '@/lib/utils';

type Props = {
  game: GameData;
};

export const HistoryItem = ({ game }: Props) => {
  const tableData = game.matchEndScore || [];
  const loosersList = (game.loosers || []).map((looser) => looser.id);
  const totalMinutes = differenceInMinutes(
    new Date(game?.endedAt || game.startedAt),
    new Date(game.startedAt),
  );
  const totalAmount = calculateCost(totalMinutes);

  return (
    <div className='bg-primary/10 p-4 rounded-lg border border-primary/20 space-y-3'>
      <div className='text-primary flex items-center justify-between gap-1 font-bold'>
        <div className='flex items-center justify-between gap-1 flex-wrap'>
          <div className='flex items-center gap-2'>
            <Clock size={12} />
            <p>
              {format(new Date(game.startedAt), 'p')} -{' '}
              {format(new Date(game?.endedAt || game.startedAt), 'p')}
            </p>
          </div>

          <p>({totalMinutes} minutes)</p>
        </div>

        <p className='text-sm font-bold bg-primary text-black rounded-full w-max px-3 py-1'>
          {currencyFormatter(totalAmount)}
        </p>
      </div>
      <p className='text-sm font-bold text-white'>
        {tableData.map((player) => player.name).join(' vs ')}
      </p>
      <div className='text-sm font-bold text-white'>
        <p>Payables:</p>

        {game.loosers.map((player) => (
          <p key={player.id} className='text-red-500'>
            {player.name} :{' '}
            {currencyFormatter(totalAmount / game.loosers.length)}
          </p>
        ))}
      </div>

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
