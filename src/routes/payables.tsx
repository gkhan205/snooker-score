import { calculatePayablePerPlayer } from '@/feature/tres/helper';
import { useTresLogic } from '@/hooks';
import { currencyFormatter } from '@/lib/utils';
import { format } from 'date-fns';

export const Payables = () => {
  const { allGamesToday } = useTresLogic();
  const payablePerPlayer = calculatePayablePerPlayer(allGamesToday);

  return (
    <>
      <h1 className='text-primary text-2xl mb-5 text-center font-bold'>
        {format(new Date(), 'PP')}
      </h1>
      {allGamesToday.length === 0 ? (
        <div className='flex items-center justify-center h-full'>
          <p className='text-snooker-muted text-sm'>No games today...</p>
        </div>
      ) : (
        <div className='grid gap-2'>
          <div className='grid grid-cols-6 gap-1 text-primary uppercase font-bold text-sm'>
            <div className='ms-3'>#</div>
            <div className='col-span-3'>Player</div>
            <div className='text-right'>Amount</div>
          </div>

          {payablePerPlayer.map((payable, index: number) => (
            <div
              className='grid grid-cols-6 gap-1 bg-snooker-overlay/70 rounded-lg p-4 text-white items-center font-bold border-1 border-snooker-muted/70'
              key={payable.id}>
              <div>{index + 1}</div>
              <div className='col-span-3'>{payable.name}</div>
              <div className='text-right'>
                {currencyFormatter(payable.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
