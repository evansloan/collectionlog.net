import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CollectionLog } from '@/components/collection-log';
import {
  APIException,
  CollectionLogAPI,
} from '@/lib/api/collection-log/collection-log-api';
import { getFullCollectionLog } from '@/lib/collection-log-helpers';

interface PageProps {
  params: {
    username: string;
    page?: string;
  };
}

export const generateMetadata = ({
  params: { username },
}: PageProps): Metadata => ({
  title: `${decodeURI(username)} | Collection Log`,
  description: `View ${decodeURI(username)}'s collection log on collectionlog.net`
});

const fetchCollectionLogData = async (username: string) => {
  try {
    return {
      ...(await getFullCollectionLog(username)),
      recentItems: await CollectionLogAPI.getRecentItems(username),
    };
  } catch (e) {
    if (e instanceof APIException && e.code === 404) {
      return notFound();
    }

    throw e;
  }
};

const Page = async ({ params: { username, page } }: PageProps) => {
  username = decodeURI(username);
  if (page) {
    page = decodeURI(page);
  }

  const {
    collectionLog,
    ranks,
    recentItems,
    settings
  } = await fetchCollectionLogData(username);

  return (
    <main className='flex flex-col items-center justify-between'>
      <CollectionLog
        collectionLog={collectionLog}
        recentItems={recentItems}
        ranks={ranks}
        settings={settings}
        startPage={page}
      />
    </main>
  );
};

export default Page;
