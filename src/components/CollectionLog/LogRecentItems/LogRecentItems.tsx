import { Col, Row } from 'react-bootstrap';

import { LogItem } from '../../CollectionLog/index';
import { formatDate } from '../../../utils/componentUtils';

import './LogRecentItems.scss';

interface LogRecentItemsProps {
  items: any[];
}

const LogRecentItems = (props: LogRecentItemsProps) => (
  <Row>
    <Col md={{ span: 10, offset: 1 }} className='recent-items-container'>
      <h3 className='text-center'>Recent Obtained Items</h3>
      <div className='recent-items'>
        {props.items.map((item) => {
          return (
            <div className='d-flex' key={item.itemId}>
              <LogItem item={item} />
              <div className='description'>
                <p>{item.name}</p>
                <p>{formatDate(item.obtainedAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Col>
  </Row>
);

export default LogRecentItems;
