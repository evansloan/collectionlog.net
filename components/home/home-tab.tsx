'use client';

import React from 'react';

import { TabsTrigger } from '@/components/ui/tabs';
import { hyphenate, replaceUrl } from '@/lib/utils';

interface HomeTabProps {
  section: string;
}

const HomeTab = ({ section }: HomeTabProps) => {
  const value = hyphenate(section).toLowerCase();
  return (
    <TabsTrigger value={value} onClick={() => replaceUrl(`/${value}`)}>
      {section}
    </TabsTrigger>
  );
};

export default HomeTab;
