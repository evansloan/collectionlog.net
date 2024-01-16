import React from 'react';

import Item from '@/components/item';
import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';

const GlobalRecentItems = async () => {
  const items = await CollectionLogAPI.getRecentItemsGlobal();
  return (
    <div className='grid w-full grid-cols-1 gap-4 overflow-y-auto overflow-x-hidden p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
      {items.map((item, i) => (
        <Item
          key={`recent-items-${i}`}
          item={item}
          width={50}
          height={45}
          includeDetails
        />
      ))}
    </div>
  );
};

export default GlobalRecentItems;
