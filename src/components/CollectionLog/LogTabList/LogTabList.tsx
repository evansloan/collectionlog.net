import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './LogTabList.scss';

interface LogTabListProps {
  onTabChangeHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const TAB_LIST_VALUES = [
  'Bosses',
  'Raids',
  'Clues',
  'Minigames',
  'Other',
];

const LogTabList = (props: LogTabListProps) => (
  <Row>
    <Col md='12' className='log-tabs'>
      <ul>
        {TAB_LIST_VALUES.map((tabName, _i) => {
          return <li data-tabname={tabName} onClick={(e) => props.onTabChangeHandler(e)}>{tabName}</li>
        })}
      </ul>
    </Col>
  </Row>
);

export default LogTabList;
