import React from 'react';
import type { Metadata } from 'next';

import { CollectionLog } from '@/components/collection-log';
import Item from '@/components/item';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';

interface PageProps {
  params: {
    username: string;
    page?: string;
  };
}

export const generateMetadata = async ({
  params: { username },
}: PageProps): Promise<Metadata> => ({
  title: `${decodeURI(username)} | Collection Log`,
  description: `View ${decodeURI(username)}'s collection log on collectionlog.net`
});

const Page = async ({ params: { username, page } }: PageProps) => {
  username = decodeURI(username);
  if (page) {
    page = decodeURI(page);
  }

  const collectionLog = await CollectionLogAPI.getCollectionLog(username);
  const recentItems = await CollectionLogAPI.getRecentItems(username);
  const ranks = await CollectionLogAPI.getRanksByUsername(username);
  const settings = await CollectionLogAPI.getUserSettings(username);

  return (
    <main className='flex flex-col items-center justify-between'>
      <CollectionLog
        collectionLog={collectionLog}
        ranks={ranks}
        settings={settings}
        startPage={page}
      />
      <Card className='w-full border-0 border-b-2 border-t-2 border-black md:border-4'>
        <CardContent>
          <Tabs defaultValue='recent-items'>
            <TabsList className='flex w-full flex-1 flex-col sm:flex-row sm:justify-around'>
              <TabsTrigger value='recent-items' className='sm:w-1/3'>
                Recent Items
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value='recent-items'
              className='grid grid-cols-1 p-2 md:grid-cols-3 lg:grid-cols-5'
            >
              {recentItems.map((item, i) => (
                <Item
                  key={`recent-item-${item.name}-${i}`}
                  item={item}
                  includeDetails={true}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
