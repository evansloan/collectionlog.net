import { ActiveElement } from '@components/ui';

import { setActiveEntry } from '@store/collectionlog/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { useState } from 'react';

import { CollectionLogEntryData } from 'src/models/CollectionLog';

const CLUE_TAB_ENTRIES = [
  'Beginner Treasure Trails',
  'Easy Treasure Trails',
  'Medium Treasure Trails',
  'Hard Treasure Trails',
  'Elite Treasure Trails',
  'Master Treasure Trails',
  'Hard Treasure Trails (Rare)',
  'Elite Treasure Trails (Rare)',
  'Master Treasure Trails (Rare)',
  'Shared Treasure Trail Rewards',
];

const LogEntryList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.collectionLog);
  const activeTab = state.activeTab as string;
  const activeEntry = state.activeEntry as string;
  const entries = state.data?.tabs[activeTab] as CollectionLogEntryData;
  let completedEntries: string[] = [];
  let sortedEntries: string[] = [];

  
  const onEntryChange = (entryName: string) => {
    if (!entryName) {
      return;
    }

    // Handle hiding/showing of entry list and items for mobile layout
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container')
    logList?.classList.add('hidden');
    logItems?.classList.remove('hidden');

    dispatch(setActiveEntry(entryName));
  }

  // Build a list of completed entries
  for (const entryName in entries) {
    const itemCount = entries[entryName].items.length;
    const obtainedCount = entries[entryName].items.filter((item) => {
      return item.obtained;
    }).length;

    const completed = obtainedCount == itemCount;

    if (completed) {
      completedEntries.push(entryName);
    }
  }

  // Sort entries alphabetical for display purposes
  sortedEntries = Object.keys(entries).sort((a, b) => {
    a = a.replace(/^The /, '');
    b = b.replace(/^The /, '');
    return a.localeCompare(b);
  });
  
  // Override sorting with pre-defined sort for clues
  if (activeTab == 'Clues') {
    sortedEntries = CLUE_TAB_ENTRIES;
  }

  return (
    <div id='log-list-container' className='w-full md:w-1/2 p-0 hidden md:block border-black border-0 border-r-4 overflow-y-auto overflow-x-hidden'>
      <div id='log-list' className='flex flex-col'>
        {sortedEntries.map((entryName, i) => {
          let className = 'm-0 p-0 pl-[3px] hover:bg-highlight text-orange text-[20px] hover:cursor-pointer entry first:shadow-log';
          if (i % 2 != 0) {
            className = `${className} bg-light`;
          }
          if (completedEntries.includes(entryName)) {
            className = `${className} !text-green`;
          }
          return (
            <ActiveElement
              id={entryName}
              tagName='p'
              className={className}
              name='log-entry'
              activeClass='!bg-highlight'
              clickHandler={() => onEntryChange(entryName)}
              isActive={entryName == activeEntry}
            >
              {entryName}
            </ActiveElement>
          );
        })}
      </div>
    </div>
  );
}

export default LogEntryList;
