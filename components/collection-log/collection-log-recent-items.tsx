import React from 'react';

import Item from '@/components/item';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CollectionLogRecentItemsProps {
  recentItems: CollectionLogItem[];
}

const CollectionLogRecentItems = ({ recentItems }: CollectionLogRecentItemsProps) => (
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
);

export default CollectionLogRecentItems;
