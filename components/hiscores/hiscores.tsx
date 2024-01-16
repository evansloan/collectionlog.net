'use client';

import React, { useState } from 'react';

import { columns } from '@/app/hiscores/columns';
import { DataTable } from '@/components/data-table';
import { HiscoresSidebar } from '@/components/hiscores';
import Spinner from '@/components/spinner';
import { CardContent } from '@/components/ui/card';

interface HiscoresProps {
  hiscores: Hiscores[];
  hiscoresPage: number;
  hiscoresRankType: RankType;
  username: string;
}

const Hiscores = ({
  hiscores,
  hiscoresPage,
  hiscoresRankType,
  username,
}: HiscoresProps) => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <CardContent className='p-2'>
      <div className='grid-cols-5 border-2 border-light md:grid'>
        <HiscoresSidebar
          page={hiscoresPage}
          rankType={hiscoresRankType}
          setIsSearching={setIsSearching}
        />
        <div className='w-full md:col-span-4'>
          {isSearching ? (
            <div className='flex h-96 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={hiscores}
              highlightValue={username}
            />
          )}
        </div>
      </div>
    </CardContent>
  );
};

export default Hiscores;
