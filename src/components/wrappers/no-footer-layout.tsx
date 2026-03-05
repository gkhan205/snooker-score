import { Header } from './header';

export const NoFooterLayout = ({
  children,
  headerName,
}: {
  children: React.ReactNode;
  headerName: string;
}) => {
  return (
    <div className='bg-snooker-table'>
      <div className='max-w-md mx-auto h-screen snooker-texture flex flex-col items-between shadow-lg'>
        <Header name={headerName} />

        <main className='flex-1 p-4 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
};
