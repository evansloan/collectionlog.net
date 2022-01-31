import React from 'react';
import { Col } from 'react-bootstrap';

import LogItem from '../LogItem/LogItem';

import './LogItems.scss';

interface LogItemsProps {
  entryName: string;
  data: {[key: string]: any};
}

class LogItems extends React.Component<LogItemsProps> {
  constructor(props: LogItemsProps) {
    super(props);
  }

  showEntries = () => {
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container');
    logList?.classList.remove('d-none');
    logItems?.classList.add('d-none');
  }

  render() {
    const obtained = (this.props.data['items'] as Array<any>).filter((item, _i) => {
      return item.obtained;
    }).length;
    const total = this.props.data['items'].length;

    let obtainedClass = 'text-yellow';
    if (obtained == total) {
      obtainedClass = 'text-green';
    } else if (obtained == 0) {
      obtainedClass = 'text-red';
    }

    return (
      <Col xs='12' md='8' id='log-items-container'>
        <button id='log-list-button' className='log-button d-md-none' type='button' onClick={this.showEntries}>Show Entries</button>
        <div className='log-entry-info'>
          <h5>{this.props.entryName}</h5>
          <p>Obtained: <span className={obtainedClass}>{obtained}/{total}</span></p>
          {this.props.data['kill_count'] != undefined &&
          (this.props.data['kill_count'] as Array<string>).map((kc, _i) => {
            return <p>{`${kc.split(': ')[0]}`}: <span>{kc.split(': ')[1]}</span></p>
          })}
        </div>
        <div className='log-items'>
          {(this.props.data['items'] as Array<any>).map((item, _i) => {
              return <LogItem item={item} />
          })}
        </div>
      </Col>
    );
  }
};

export default LogItems;
