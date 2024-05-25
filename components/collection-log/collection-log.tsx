'use client';

import React, { useEffect, useState } from 'react';

import Loading from '@/app/loading';
import {
  CollectionLogContent,
  CollectionLogHeader,
  CollectionLogRecentItems,
  CollectionLogSearchContent,
} from '@/components/collection-log';
import CollectionLogProvider from '@/components/providers/collection-log-provider';
import { useLoadingContext } from '@/components/providers/loading-provider';
import { Card, CardContent } from '@/components/ui/card';

interface CollectionLogProps {
  collectionLog: CollectionLog;
  recentItems: CollectionLogItem[];
  ranks: Ranks;
  settings: UserSettings;
  startPage?: string;
}

const CollectionLog = ({
  collectionLog,
  ranks,
  recentItems,
  settings,
  startPage,
}: CollectionLogProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <CollectionLogProvider collectionLog={collectionLog}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Card className='mb-2 w-full border-0 border-b-2 border-t-2 border-black md:border-4'>
            <CollectionLogHeader
              ranks={ranks}
              defaultRankType={settings.displayRank}
              includeSearch
              isSearchOpen={isSearchOpen}
              onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <CardContent>
              {isSearchOpen ? (
                <CollectionLogSearchContent />
              ) : (
                <CollectionLogContent
                  settings={settings}
                  startPage={startPage}
                />
              )}
            </CardContent>
          </Card>
          <CollectionLogRecentItems recentItems={recentItems} />
        </>
      )}
    </CollectionLogProvider>
  );
};

export default CollectionLog;
