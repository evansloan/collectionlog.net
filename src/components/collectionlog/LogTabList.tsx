import React from 'react';

import { ActiveElement } from '@components/ui';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateActiveTab } from '@store/collectionlog/actions';

const TAB_LIST_VALUES = [
  'Bosses',
  'Raids',
  'Clues',
  'Minigames',
  'Other',
];

const LogTabList = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.collectionLog);

  const onTabChange = (tabName: string) => {
    if (!tabName || !state.data) {
      return;
    }

    const entryName = Object.keys(state.data.tabs[tabName]).sort()[0];
    dispatch(updateActiveTab(tabName, entryName));
  };

  return (
    <div className='flex flex-wrap justify-around p-0 pt-[5px] border-l-4 border-l-black border-r-4 border-r-black border-b border-b-light'>
      {TAB_LIST_VALUES.map((tabName, i) => {
        return (
          <ActiveElement
            key={`${tabName}-${i}`}
            tagName='div'
            className='flex-grow px-[5px] py-0 min-w-[100px] max-w-[18%] bg-dark hover:bg-highlight border border-light border-b-0 rounded-t-[5%] cursor-pointer'
            name='log-tab'
            activeClass='!bg-tabHighlight'
            clickHandler={() => onTabChange(tabName)}
            isActive={tabName == state.activeTab}
          >
            <span className='block text-orange text-center text-[20px] font-bold'>{tabName}</span>
          </ActiveElement>
        );
      })}
    </div>
  );
};

export default LogTabList;
