import { Col, Row } from 'react-bootstrap';

import './HiscoresHeader.scss';

interface HiscoresHeaderProps {
  type: string;
  page: number;
  pageLength: number;
  onPageChangeHandler: (page: number) => void;
  onFilterChangeHandler: (filter: string) => void;
}

const HiscoresHeader = (props: HiscoresHeaderProps) => (
  <Row>
    <Col md={{ span: 8, offset: 2 }} className='hiscores-header'>
      <div className='d-flex justify-content-between'>
        <h2 className='page'>
          {props.page > 1 &&
            <a onClick={() => props.onPageChangeHandler(props.page - 1)}>&lt; Page {props.page - 1}</a>
          }
        </h2>
        <h1 className='text-center'>{props.type} Hiscores</h1>
        <h2 className='page right'>
          {props.pageLength == 25 &&
            <a onClick={() => props.onPageChangeHandler(props.page + 1)}>Page {props.page + 1} &gt;</a>
          }
        </h2>
      </div>
      <div className='hiscores-filters'>
        <a id='filter-all' className='filter-active' onClick={() => props.onFilterChangeHandler('all')}>All</a>
        <a id='filter-ironman' onClick={() => props.onFilterChangeHandler('ironman')}>Ironman</a>
        <a id='filter-hardcore-ironman' onClick={() => props.onFilterChangeHandler('hardcore-ironman')}>Hardcore Ironman</a>
        <a id='filter-group-ironman' onClick={() => props.onFilterChangeHandler('group-ironman')}>Group Ironman</a>
        <a id='filter-ultimate-ironman' onClick={() => props.onFilterChangeHandler('ultimate-ironman')}>Ultimate Ironman</a>
        <a id='filter-normal' onClick={() => props.onFilterChangeHandler('normal')}>Normal</a>
      </div>
    </Col>
  </Row>
)

export default HiscoresHeader;
