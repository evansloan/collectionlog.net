import React from 'react';

import Spinner from '@/components/spinner';

const Loading = () => {
  return (
    <div className='p-19 flex h-[90vh] items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default Loading;
