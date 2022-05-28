import React from 'react';

import { ActiveElement } from '@components/ui';

interface LogTabListProps {
  activeTab?: string;
  onTabChangeHandler: (tabName: string) => void;
}

const TAB_LIST_VALUES = [
  'Bosses',
  'Raids',
  'Clues',
  'Minigames',
  'Other',
];

const LogTabList = (props: LogTabListProps) => {
  return (
    <div className='flex flex-wrap justify-around p-0 pt-[5px] border-l-4 border-l-black border-r-4 border-r-black border-b border-b-light'>
      {TAB_LIST_VALUES.map((tabName) => {
        return (
          <ActiveElement
            tagName='div'
            className='flex-grow px-[5px] py-0 min-w-[100px] max-w-[18%] bg-dark hover:bg-highlight border border-light border-b-0 rounded-t-[5%] cursor-pointer'
            name='log-tab' 
            activeClass='!bg-tabHighlight'
            clickHandler={() => props.onTabChangeHandler(tabName)}
            isActive={tabName == props.activeTab}
          >
            <span className='block text-orange text-center text-[20px] font-bold'>{tabName}</span>
          </ActiveElement>
        );
      })}
    </div>
  );
};

export default LogTabList;
