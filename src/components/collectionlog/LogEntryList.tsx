import { ActiveElement } from '@components/ui';
import React from 'react';

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

interface LogEntryListProps {
  activeEntry: string;
  activeTab: string;
  entries: { [key: string]: any };
  onEntryChangeHandler: (entryName: string) => void;
}

class LogEntryList extends React.Component<LogEntryListProps> {

  constructor(props: LogEntryListProps) {
    super(props);
    this.setCompletedEntries();
  }

  setCompletedEntries = () => {
    for (let key in this.props.entries) {

      const itemCount = this.props.entries[key].items.length;
      const obtainedCount = this.props.entries[key].items.filter((item: any) => {
        return item.obtained;
      }).length;
      const completed = obtainedCount == itemCount;

      let entry = document.getElementById(key);
      entry?.classList.remove('!text-green');
      if (completed) {
        entry?.classList.add('!text-green');
      }
    }
  }

  componentDidMount() {
    this.setCompletedEntries();
  }

  componentDidUpdate(prevProps: LogEntryListProps) {
    this.setCompletedEntries();
  }

  sortAlphabetical = () => {
    return Object.keys(this.props.entries).sort((a, b) => {
      a = a.replace(/^The /, '');
      b = b.replace(/^The /, '');
      return a.localeCompare(b);
    });
  }

  render() {
    let entries = this.sortAlphabetical();
    if (this.props.activeTab == 'Clues') {
      entries = CLUE_TAB_ENTRIES;
    }
    return (
      <div id='log-list-container' className='w-full md:w-1/2 p-0 hidden md:block border-black border-0 border-r-4 overflow-y-auto overflow-x-hidden'>
        <div id='log-list' className='flex flex-col'>
          {entries.map((entryName, i) => {
            let className = 'm-0 p-0 pl-[3px] hover:bg-highlight text-orange text-[20px] hover:cursor-pointer entry first:shadow-log';
            if (i % 2 != 0) {
              className = `${className} bg-light`;
            }
            return (
              <ActiveElement
                id={entryName}
                tagName='p'
                className={className}
                name='log-entry'
                activeClass='!bg-highlight'
                clickHandler={() => this.props.onEntryChangeHandler(entryName)}
                isActive={entryName == this.props.activeEntry}
              >
                {entryName}
              </ActiveElement>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LogEntryList;
