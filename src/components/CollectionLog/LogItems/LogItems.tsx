import React from 'react';

import LogItem from '../LogItem/LogItem';

import { FlexSection } from '@components/ui';

interface LogItemsProps {
  entryName: string;
  data: any;
}

class LogItems extends React.Component<LogItemsProps> {
  constructor(props: LogItemsProps) {
    super(props);
  }

  showEntries = () => {
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container');
    logList?.classList.remove('hidden');
    logItems?.classList.add('hidden');
  }

  render() {
    const obtained = (this.props.data.items as any[]).filter((item) => {
      return item.obtained;
    }).length;
    const total = this.props.data.items.length;

    let obtainedClass = 'text-yellow';
    if (obtained == total) {
      obtainedClass = 'text-green';
    } else if (!obtained) {
      obtainedClass = 'text-red';
    }
    return (
      <FlexSection
        id='log-items-container'
        direction='flex-col'
        height='h-[550px]'
        width='w-full'
        padding='pb-[10px]'
        borderStyle=''
      >
        <button id='log-list-button' className='log-button mt-[10px] md:hidden' type='button' onClick={this.showEntries}>Show Entries</button>
        <div className='log-entry-info mx-2 border-b border-b-lighter'>
          <h3 className='text-left'>{this.props.entryName}</h3>
          <p className='m-0 text-orange'>Obtained: <span className={obtainedClass}>{obtained}/{total}</span></p>
          {this.props.data['kill_count'] != undefined &&
          (this.props.data['kill_count'] as any[]).map((kc, i) => {
            return <p key={`${i}-${kc.name}`} className='m-0 text-orange'>{`${kc.name}`}: <span className='text-white'>{kc.amount}</span></p>
          })}
        </div>
        <div className='flex flex-row flex-wrap grow content-start max-w-full overflow-y-auto px-2'>
          {(this.props.data.items as any[]).map((item, i) => {
              return <LogItem key={`${i}-${item.id}`} item={item} />
          })}
        </div>
      </FlexSection>
    );
  }
};

export default LogItems;
