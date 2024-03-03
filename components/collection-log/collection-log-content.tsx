'use client';

import React, { useEffect } from 'react';

import {
  CollectionLogItems,
  CollectionLogPageList,
} from '@/components/collection-log';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollectionLogView } from '@/lib/hooks';
import { useCollectionlogContext } from '@/components/collection-log/collection-log-provider';
import { replaceUrl } from '@/lib/utils';

interface CollectionLogContentProps {
  settings: UserSettings;
  startPage?: string;
}

const CollectionLogContent = ({
  settings,
  startPage,
}: CollectionLogContentProps) => {
  const collectionLog = useCollectionlogContext();
  const { tabs, username } = collectionLog;
  const { showQuantity } = settings;
  const tabNames = Object.keys(tabs);

  const {
    openView,
    openView: {
      tab: { name: activeTabName },
      page: { name: activePageName },
    },
    updateViewByTab,
    updateViewByPage,
  } = useCollectionLogView(collectionLog, startPage);

  const onTabClick = (tabName: string) => updateViewByTab(tabName);

  const onPageClick = (pageName: string) => updateViewByPage(pageName);

  useEffect(() => {
    replaceUrl(`/log/${username}/${activePageName}`);
  }, [activePageName, username]);

  return (
    <Tabs defaultValue={activeTabName}>
      <TabsList className='flex w-full flex-col md:grid md:w-full md:grid-cols-5 md:gap-2 lg:gap-x-12'>
        {tabNames.map((tabName, i) => (
          <TabsTrigger
            key={`${tabName}-trigger-${i}`}
            value={tabName}
            onClick={(e) => onTabClick(e.currentTarget.innerText)}
          >
            {tabName}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabNames.map((tabName, i) => (
        <TabsContent
          key={`${tabName}-content-${i}`}
          value={tabName}
          className='grid grid-cols-4 items-start overflow-hidden md:h-[550px]'
        >
          <CollectionLogPageList
            activePageName={activePageName}
            tab={tabs[tabName]}
            pageClickHandler={onPageClick}
          />
          <CollectionLogItems
            activeOpenView={openView}
            showQuantity={showQuantity}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CollectionLogContent;
