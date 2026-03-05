export const About = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-snooker-muted'>
      <div className='mb-20'>
        <h1 className='text-6xl text-center text-primary font-bold'>
          FrameScore
        </h1>

        <div className='bg-primary/10 p-4 border-1 text-sm my-10 border-primary/20 rounded-lg w-full max-w-md'>
          <h2 className='font-bold uppercase text-primary'>How it works</h2>
          <p>
            Frame result is calculated by subtracting the next player's score
            from the current player's score. This value determines the point
            distribution for the final frame.
          </p>
        </div>
      </div>

      <p>
        Developed by{' '}
        <a
          href='https://ghazikhan.in'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary underline'>
          Ghazi Khan
        </a>
      </p>
    </div>
  );
};
