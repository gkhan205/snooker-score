import { cn } from '@/lib/utils';
import { eachDayOfInterval, subDays, format } from 'date-fns';
import { useState } from 'react';

type Props = {
  onSelect: (date: Date) => void;
};

export const DateFilters = ({ onSelect }: Props) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const sixDaysAgo = subDays(today, 3);

  const lastSevenDays = eachDayOfInterval({
    start: sixDaysAgo,
    end: today,
  });

  const formatDate = (date: Date) => {
    return {
      day: format(date, 'dd'),
      dayLabel: format(date, 'EEE'),
    };
  };

  const handleDateClick = (date: Date) => () => {
    setSelectedDate(date);
    onSelect(date);
  };

  return (
    <div className='flex w-full items-center justify-center gap-3 mb-3'>
      {lastSevenDays.map((date) => {
        const { day, dayLabel } = formatDate(date);
        return (
          <div
            key={date.toISOString()}
            className={cn(
              'flex flex-col items-center cursor-pointer text-sm text-slate-400 hover:text-slate-100 bg-snooker-table/60 backdrop-blur-md rounded-lg px-3 py-2 w-[48px]',
              {
                'bg-primary text-background-dark':
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd'),
              },
            )}
            onClick={handleDateClick(date)}>
            <span className='text-xs uppercase font-bold'>{dayLabel}</span>
            <span
              className={cn('text-lg text-white font-bold', {
                'text-background-dark':
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd'),
              })}>
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
};
