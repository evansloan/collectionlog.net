import React from 'react';
import { Col } from 'react-bootstrap';

import './LogEntryList.scss';

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
  activeTab: string;
  entries: { [key: string]: any };
  onEntryChangeHandler: (e: React.MouseEvent<HTMLParagraphElement>, entryName: string) => void;
}

class LogEntryList extends React.Component<LogEntryListProps> {

  constructor(props: LogEntryListProps) {
    super(props);
    this.setCompletedEntries();
  }

  setCompletedEntries = () => {
    for (let key in this.props.entries) {
      let completed = true;

      for (let item of this.props.entries[key].items) {
        if (!item.obtained) {
          completed = false;
          break;
        }
      }
      
      let entry = document.getElementById(key);
      if (entry) {
        if (completed) {
          entry.classList.add('text-green');
        }
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
      <Col md='4' id='log-list-container' className='d-none d-md-block'>
        <div id='log-list' className='d-flex flex-column'>
          {entries.map((entryName, i) => {
            return <p id={entryName} className={i == 0 ? 'entry active' : 'entry'} key={entryName} onClick={(e) => this.props.onEntryChangeHandler(e, entryName)}>{entryName}</p>
          })}
        </div>
      </Col>
    );
  }
}

export default LogEntryList;
