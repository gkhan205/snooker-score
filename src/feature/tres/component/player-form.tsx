import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  onAddPlayer: (name: string) => void;
};

export const PlayerForm = ({ onAddPlayer }: Props) => {
  const [name, setName] = useState('');

  const onSubmit = (data: { name: string }) => {
    onAddPlayer(data.name);
    setName('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name });
        }}
        className='space-y-2 flex gap-2'>
        <Input
          id='name'
          placeholder='Enter Player Name'
          value={name}
          onChange={handleChange}
          autoComplete='off'
          className={cn(
            'border-1 border-primary p-2 h-[50px] rounded-lg text-primary font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          )}
        />

        <Button type='submit' className='h-[50px]'>
          <Plus />
        </Button>
      </form>
    </>
  );
};
