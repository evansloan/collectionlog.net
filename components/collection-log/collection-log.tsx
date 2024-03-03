'use client';

import React, { useState } from 'react';

import {
  CollectionLogContent,
  CollectionLogHeader,
  CollectionLogProvider,
  CollectionLogSearchContent,
} from '@/components/collection-log';
import { Card, CardContent } from '@/components/ui/card';

interface CollectionLogProps {
  collectionLog: CollectionLog;
  ranks: Ranks;
  settings: UserSettings;
  startPage?: string;
}

const CollectionLog = ({
  collectionLog,
  ranks,
  settings,
  startPage,
}: CollectionLogProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CollectionLogProvider collectionLog={collectionLog}>
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
            <CollectionLogContent settings={settings} startPage={startPage} />
          )}
        </CardContent>
      </Card>
    </CollectionLogProvider>
  );
};

export default CollectionLog;
