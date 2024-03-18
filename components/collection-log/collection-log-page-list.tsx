'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CollectionLogPageListProps {
  activePageName: string;
  tab: CollectionLogPage;
  pageClickHandler: (pageName: string) => void;
  customHighlight?: (pageName: string) => string;
  className?: string;
}

const CollectionLogPageList = ({
  activePageName,
  tab,
  pageClickHandler,
  customHighlight,
  className,
}: CollectionLogPageListProps) => {
  const pageNames = Object.keys(tab);
  const [isOpen, setIsOpen] = useState(false);

  const mobileDisplayClass = isOpen ? 'col-span-4' : 'hidden';

  const onPageClick = (pageName: string) => {
    pageClickHandler(pageName);

    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        className='col-span-4 m-2 block md:hidden'
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        Show page list
      </Button>
      <div
        className={cn(
          `scroll-log-dark ${mobileDisplayClass} h-full flex-col overflow-y-auto border-r border-black shadow-log md:col-span-1 md:flex`,
          className
        )}
      >
        {pageNames.map((pageName, i) => {
          const pageItems = tab[pageName].items;
          const itemCount = pageItems.length;
          const obtainedCount = pageItems.filter(
            (item) => item.obtained
          ).length;

          const pageCompleted = itemCount === obtainedCount;
          let textColor = pageCompleted ? 'text-rs-green' : 'text-rs-orange';
          if (customHighlight) {
            textColor = customHighlight(pageName);
          }

          let bg = i % 2 ? 'bg-light' : 'bg-card';
          if (pageName === activePageName) {
            bg = 'bg-accent';
          }

          return (
            <div
              key={`${pageName}-${i}`}
              className={`${bg} ${textColor} cursor-pointer py-2 hover:bg-accent md:py-0`}
              onClick={() => onPageClick(pageName)}
            >
              {pageName}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CollectionLogPageList;
