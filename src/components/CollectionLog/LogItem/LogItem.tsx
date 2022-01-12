import React from 'react';
import { Col } from 'react-bootstrap';

import './LogItem.scss';

type LogItemProps = {
  item: any;
};

const LogItem = (props: LogItemProps) => (
  <Col md='2' className='item'>
    <span className='item-quantity'>{props.item.quantity > 0 ? props.item.quantity : '\u00a0'}</span>
    <span className='item-tooltip'>{props.item.name}</span>
    <div className='item-img-container'>
      <img
        className={props.item.obtained ? 'item-obtained' : ''}
        src={`https://www.osrsbox.com/osrsbox-db/items-icons/${props.item.id}.png`}>
      </img>
    </div>
  </Col>
);

export default LogItem;