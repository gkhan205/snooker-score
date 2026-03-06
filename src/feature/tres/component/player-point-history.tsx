import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info } from 'lucide-react';

export const PlayerPointHistory = ({
  pointsHistory,
}: {
  pointsHistory: number[];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='p-0'>
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-primary border-0'>
        <PopoverHeader>
          <PopoverTitle>Point History</PopoverTitle>
          <PopoverDescription>
            <p className='text-black'>{pointsHistory.join(', ')}</p>
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};
