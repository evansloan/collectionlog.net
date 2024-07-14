'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Loading from '@/app/loading';
import {
  CollectionLogHeader,
  CollectionLogItems,
  CollectionLogPageList,
} from '@/components/collection-log';
import CollectionLogProvider from '@/components/providers/collection-log-provider';
import { useLoadingContext } from '@/components/providers/loading-provider';
import { UserTypeahead } from '@/components/typeahead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CollectionLogFull,
  sortCollectionLog,
} from '@/lib/collection-log-helpers';
import { useCollectionLogView } from '@/lib/hooks';
import { replaceUrl } from '@/lib/utils';

interface CompareContentProps {
  data1: CollectionLogFull;
  data2: CollectionLogFull;
  startPage?: string;
}

const CompareContent = ({ data1, data2, startPage }: CompareContentProps) => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const {
    collectionLog: collectionLog1,
    collectionLog: { username: username1 },
    ranks: ranks1,
    settings: settings1,
  } = data1;
  const {
    collectionLog: collectionLog2,
    collectionLog: { username: username2 },
    ranks: ranks2,
    settings: settings2,
  } = data2;

  [collectionLog1, collectionLog2].forEach((collectionLog) =>
    sortCollectionLog(collectionLog)
  );

  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);

  const { tabs: tabs1 } = collectionLog1;
  const { tabs: tabs2 } = collectionLog2;

  const tabNames = Object.keys(tabs1);

  const {
    openView: openView1,
    openView: {
      tab: { name: activeTabName },
      page: { name: activePageName },
    },
    updateViewByTab: updateViewByTab1,
    updateViewByPage: updateViewByPage1,
  } = useCollectionLogView(collectionLog1, startPage);

  const {
    openView: openView2,
    updateViewByTab: updateViewByTab2,
    updateViewByPage: updateViewByPage2,
  } = useCollectionLogView(collectionLog2, startPage);

  const [syncScroll, setSyncScroll] = useState(true);

  const onTabClick = (tabName: string) => {
    updateViewByTab1(tabName);
    updateViewByTab2(tabName);
  };

  const onPageClick = (pageName: string) => {
    updateViewByPage1(pageName);
    updateViewByPage2(pageName);
  };

  const onContainerScroll = (
    containerRef: RefObject<HTMLDivElement>,
    scrollValue: number
  ) => {
    if (!containerRef.current) {
      return;
    }

    if (!syncScroll) {
      return;
    }

    containerRef.current.scrollTo({
      top: scrollValue,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    replaceUrl(`/compare/${username1}/${username2}/${activePageName}`);
  }, [activePageName, username1, username2]);

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  const customPageHighlight = (pageName: string) => {
    // TODO: I don't like any of this
    const page1 = tabs1[activeTabName][pageName];
    const page2 = tabs2[activeTabName][pageName];
    const pageItems1 = page1.items;
    const pageItems2 = page2?.items ?? [...Array(pageItems1.length)];
    const itemCount1 = pageItems1.length;
    const itemCount2 = pageItems2.length;

    const obtainedFilter = (item: CollectionLogItem) => item?.obtained ?? false;

    const obtainedCount1 = pageItems1.filter(obtainedFilter).length;
    const obtainedCount2 = pageItems2.filter(obtainedFilter).length;

    const pageCompleted1 = itemCount1 === obtainedCount1;
    const pageCompleted2 = itemCount2 === obtainedCount2;

    let highlight = 'text-rs-orange border-rs-green';
    if (pageCompleted1 && pageCompleted2) {
      highlight += ' border-x-4';
    }
    if (pageCompleted1) {
      highlight += ' border-l-4';
    }

    if (pageCompleted2) {
      highlight += ' border-r-4';
    }

    return highlight;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Card className='mb-2 w-full flex-row border-0 border-b-2 border-t-2 border-black md:border-4'>
          <div className='grid grid-cols-8'>
            <CollectionLogProvider collectionLog={collectionLog1}>
              <CollectionLogHeader
                className='col-span-3'
                ranks={ranks1}
                defaultRankType={settings1.displayRank}
              />
            </CollectionLogProvider>
            <div className='col-span-2 flex flex-col items-center gap-y-2 border-b-4 py-2'>
              <div className='flex flex-col gap-x-2 xl:flex-row'>
                <UserTypeahead
                  navigateTo={(username) => `/compare/${username}/${username2}`}
                  onResultClick={() => setIsLoading(true)}
                  usePopover
                >
                  <Button>
                    <ChevronLeft className='h-4 w-4' />
                    Change user 1
                  </Button>
                </UserTypeahead>
                <UserTypeahead
                  navigateTo={(username) => `/compare/${username1}/${username}`}
                  onResultClick={() => setIsLoading(true)}
                  usePopover
                >
                  <Button>
                    Change user 2
                    <ChevronRight className='h-4 w-4' />
                  </Button>
                </UserTypeahead>
              </div>
              <div className='flex items-center gap-x-1'>
                <Checkbox
                  checked={syncScroll}
                  onCheckedChange={() => setSyncScroll(!syncScroll)}
                />
                <p>Scroll items simultaneously</p>
              </div>
            </div>
            <CollectionLogProvider collectionLog={collectionLog2}>
              <CollectionLogHeader
                className='col-span-3'
                ranks={ranks2}
                defaultRankType={settings2.displayRank}
              />
            </CollectionLogProvider>
          </div>
          <CardContent>
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
                  className='flex overflow-hidden md:grid md:h-[550px] md:grid-cols-8'
                >
                  <CollectionLogItems
                    className='col-span-3'
                    activeOpenView={openView1}
                    showQuantity={settings1.showQuantity}
                    onScroll={(e) =>
                      onContainerScroll(
                        container2Ref,
                        e.currentTarget.scrollTop
                      )
                    }
                    ref={container1Ref}
                  />
                  <CollectionLogPageList
                    className='col-span-8 border-x text-center md:col-span-2'
                    activePageName={activePageName}
                    tab={tabs1[activeTabName]}
                    pageClickHandler={onPageClick}
                    customHighlight={customPageHighlight}
                  />
                  <CollectionLogItems
                    className='col-span-3'
                    activeOpenView={openView2}
                    showQuantity={settings2.showQuantity}
                    onScroll={(e) =>
                      onContainerScroll(container1Ref, e.currentTarget.scrollTop)
                    }
                    ref={container2Ref}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CompareContent;
