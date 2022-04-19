import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './LogTabList.scss';

interface LogTabListProps {
  onTabChangeHandler: (e: React.MouseEvent<HTMLDivElement>, tabName: string) => void;
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
    <Row>
      <Col md='12' className='log-tabs'>
        {TAB_LIST_VALUES.map((tabName, i) => {
          return (
            <div className={i == 0 ? 'tab active' : 'tab'} key={tabName} onClick={(e) => props.onTabChangeHandler(e, tabName)}>
              <span>{tabName}</span>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default LogTabList;
