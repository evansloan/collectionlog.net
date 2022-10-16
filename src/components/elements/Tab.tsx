import React from 'react';

interface TabProps {
  activeTab: string;
  label: string;
  onTabClick: (tabName: string) => void;
}

const Tab = (props: TabProps) => {
  const { activeTab, label, onTabClick } = props;

  let className = 'bg-dark';
  if (activeTab == label) {
    className = 'bg-tabHighlight';
  }

  return (
    <div className={`flex justify-center items-center grow px-[5px] py-0 max-w-[18%] min-w-full sm:min-w-[120px] hover:bg-highlight border-2 border-light border-b-0 md:rounded-tl-[10px] md:rounded-tr-[10px] cursor-pointer ${className}`} onClick={() => onTabClick(label)}>
      <span className='text-orange text-center text-lg font-bold'>{label}</span>
    </div>
  );
};

export default Tab;