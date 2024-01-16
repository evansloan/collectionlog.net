import React, { Suspense } from 'react';

import {
  ChangeLog,
  Faq,
  HomeTab,
  LiveStreams,
  GlobalRecentItems,
  UserCount,
  QuickStart,
} from '@/components/home';
import Spinner from '@/components/spinner';
import { CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { hyphenate } from '@/lib/utils';

interface HomeContentProps {
  section: string;
}

const SECTIONS = [
  'Recent items',
  'Live streams',
  'Quick start',
  'FAQ',
  'Change log',
];

const HomeContent = async ({ section }: HomeContentProps) => {
  const activeSection = hyphenate(
    SECTIONS.find((s) => hyphenate(s).toLowerCase() === section) ?? SECTIONS[0]
  ).toLowerCase();

  return (
    <>
      <Suspense fallback={'Loading...'}>
        <UserCount />
      </Suspense>
      <CardContent>
        <Tabs defaultValue={activeSection}>
          <TabsList className='flex w-full flex-col md:grid md:grid-cols-5 md:gap-2 lg:gap-16'>
            {SECTIONS.map((section, i) => (
              <HomeTab key={`tab-${section}-${i}`} section={section} />
            ))}
          </TabsList>
          <TabsContent
            value='recent-items'
            className='flex flex-col items-center overflow-hidden'
          >
            <h3>Recent obtained items</h3>
            <p>Updates every 10 minutes</p>
            <Suspense fallback={<Spinner wrap />}>
              <GlobalRecentItems />
            </Suspense>
          </TabsContent>
          <TabsContent
            value='live-streams'
            className='flex flex-col items-center overflow-hidden'
          >
            <h3>Live OSRS streams on Twitch.tv</h3>
            <p>
              See how to get your stream on collectionlog.net{' '}
              <a href='/faq'>here</a>
            </p>
            <Suspense fallback={<Spinner wrap />}>
              <LiveStreams />
            </Suspense>
          </TabsContent>
          <TabsContent
            value='quick-start'
            className='flex flex-col items-center overflow-hidden'
          >
            <h3>Collection log plugin quick start</h3>
            <p>
              Learn how to get your collection log displayed on
              collectionlog.net
            </p>
            <QuickStart />
          </TabsContent>
          <TabsContent value='faq' className='flex flex-col items-center'>
            <h3>collectionlog.net FAQ</h3>
            <p>Find answers to frequently asked questions</p>
            <Faq />
          </TabsContent>
          <TabsContent
            value='change-log'
            className='flex flex-col items-center overflow-hidden'
          >
            <h3>collectionlog.net updates</h3>
            <p>See the latest collectionlog.net updates</p>
            <Suspense fallback={<Spinner wrap />}>
              <ChangeLog />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
};

export default HomeContent;
