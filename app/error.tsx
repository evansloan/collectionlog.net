'use client';

const Error = ({ error }: { error: Error & { digest?: string } }) => (
  <main className='flex h-full flex-col items-center justify-center'>
    <h2 className='text-center'>{error.message}</h2>
  </main>
);

export default Error;
