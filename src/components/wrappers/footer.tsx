import { History, Home, Info } from 'lucide-react';
import { NavLink } from 'react-router';

export const Footer = () => {
  return (
    <footer className='w-full h-20 px-8 flex text-sm items-center bg-snooker-overlay text-snooker-muted'>
      <div className='grid grid-cols-3 gap-8 w-full'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'text-snooker-gold' : '')}>
          <div className=' flex flex-col justify-center items-center'>
            <Home />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to='/history'
          className={({ isActive }) => (isActive ? 'text-snooker-gold' : '')}>
          <div className='flex flex-col justify-center items-center'>
            <History />
            <p>History</p>
          </div>
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'text-snooker-gold' : '')}>
          <div className='flex flex-col justify-center items-center'>
            <Info />
            <p>About</p>
          </div>
        </NavLink>
      </div>
    </footer>
  );
};
