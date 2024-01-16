'use client';

import { useCollectionlogContext } from '@/lib/providers/collection-log-provider';
import React, { useCallback, useState } from 'react';
import { debounce } from 'next/dist/server/utils';

import Item from '@/components/item';
import { Input } from '@/components/ui/input';
import { sortKeys } from '@/lib/utils';

const SEARCH_DEBOUNCE = 250;

interface SearchItems {
  [key: string]: CollectionLogItem[];
}

const CollectionLogSearchContent = () => {
  const collectionLog = useCollectionlogContext();
  const [searchItems, setSearchItems] = useState<SearchItems>({});

  const searchDebounce = debounce(async (searchQuery: string) => {
    const matchingItems: SearchItems = {};

    if (!searchQuery.trim().length) {
      return setSearchItems({});
    }

    const tabs = collectionLog.tabs;
    for (const tabName of Object.keys(tabs)) {
      const pages = tabs[tabName];
      for (const pageName of Object.keys(pages)) {
        const items = pages[pageName].items;
        const filtered = items.filter(
          (item) => item.name.toLowerCase().indexOf(searchQuery) > -1
        );
        if (filtered.length) {
          matchingItems[pageName] = filtered;
        }
      }
    }

    setSearchItems(sortKeys(matchingItems));
  }, SEARCH_DEBOUNCE);

  const onSearchChange = useCallback(
    (searchQuery: string) => searchDebounce(searchQuery),
    [searchDebounce]
  );

  return (
    <div className='overflow-hidden'>
      <div className='mb-1 flex pt-2'>
        <p className='px-5 py-2 text-center text-xl text-rs-orange'>Search:</p>
        <Input
          className='text-xl'
          placeholder='*'
          onChange={(e) => onSearchChange(e.currentTarget.value)}
          autoFocus
        />
      </div>
      <div className='scroll-log h-[532px] overflow-y-scroll border-2 p-2'>
        {Object.keys(searchItems).length ? (
          Object.keys(searchItems).map((pageName, i) => {
            const items = searchItems[pageName];
            if (items.length) {
              return (
                <div
                  key={`search-${pageName}-${i}`}
                  className='border-b-2 border-b-light p-2'
                >
                  <h3>{pageName}</h3>
                  <div className='grid grid-cols-3 gap-y-4 pt-4 sm:grid-cols-5 lg:grid-cols-8'>
                    {searchItems[pageName].map((item, i) => (
                      <div
                        key={`search-${item.name}-${i}`}
                        className='flex h-[45px] items-center justify-center'
                      >
                        <Item
                          item={item}
                          showQuantity={true}
                          showHover={true}
                          width={50}
                          height={45}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <p className='text-center text-xl'>No results...</p>
        )}
      </div>
    </div>
  );
};

export default CollectionLogSearchContent;
