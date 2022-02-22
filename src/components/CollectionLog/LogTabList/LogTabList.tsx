import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './LogTabList.scss';

interface LogTabListProps {
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
    <Row>
      <Col md='12' className='log-tabs'>
        {TAB_LIST_VALUES.map((tabName, _i) => {
          return (
            <div className='tab' key={tabName} onClick={() => props.onTabChangeHandler(tabName)}>
              <span>{tabName}</span>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default LogTabList;
