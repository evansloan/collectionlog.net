'use client';

import { useEffect } from 'react';

type ErrorProps = { error: Error & { digest?: string } };

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h2 className='text-center'>
        An error occurred when trying to load the page. Please try again in a
        moment.
      </h2>
    </main>
  );
};

export default Error;
