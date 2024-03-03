import type { Metadata } from 'next';
import React from 'react';

import { Hiscores } from '@/components/hiscores';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';

interface PageProps {
  searchParams: {
    page?: string;
    accountType?: RankType;
    username?: string;
  };
}

export const generateMetadata = async ({
  searchParams: { page },
}: PageProps): Promise<Metadata> => ({
  title: `Page ${parseInt(page ?? '1')} | Collection Log Hiscores`,
  description: 'View the top cloggers on collectionlog.net',
});

const Page = async ({
  searchParams: { page, accountType, username },
}: PageProps) => {
  const hiscoresPage = parseInt(page ?? '1');
  const hiscoresRankType = accountType ?? 'ALL';
  const hiscores = await CollectionLogAPI.getHiscores(
    hiscoresPage,
    hiscoresRankType
  );

  return (
    <main className='flex flex-col items-center justify-between'>
      <Card className='w-full border-0 border-b-2 border-t-2 border-black md:border-4'>
        <CardHeader className='items-center'>
          <CardTitle>Hiscores - Page {hiscoresPage}</CardTitle>
          <CardDescription>
            View the top cloggers and find your place among their ranks
          </CardDescription>
        </CardHeader>
        <Hiscores
          hiscores={hiscores}
          hiscoresPage={hiscoresPage}
          hiscoresRankType={hiscoresRankType}
          username={username as string}
        />
      </Card>
    </main>
  );
};

export default Page;
