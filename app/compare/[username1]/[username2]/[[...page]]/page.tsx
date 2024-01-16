import React from 'react';
import type { Metadata } from 'next';

import CompareContent from '@/components/compare/compare-content';
import { getFullCollectionLog } from '@/lib/collection-log-helpers';

interface PageProps {
  params: {
    username1: string;
    username2: string;
    page?: string;
  };
}

export const generateMetadata = async ({
  params: { username1, username2 },
}: PageProps): Promise<Metadata> => ({
  title: `${decodeURI(username1)} - ${decodeURI(username2)} | Collection Log`,
});

const Page = async ({ params: { username1, username2, page } }: PageProps) => {
  username1 = decodeURI(username1);
  username2 = decodeURI(username2);
  if (page) {
    page = decodeURI(page);
  }

  const clog1 = await getFullCollectionLog(username1);
  const clog2 = await getFullCollectionLog(username2);

  return (
    <main className='flex flex-col items-center justify-between'>
      <CompareContent data1={clog1} data2={clog2} startPage={page} />
    </main>
  );
};

export default Page;
