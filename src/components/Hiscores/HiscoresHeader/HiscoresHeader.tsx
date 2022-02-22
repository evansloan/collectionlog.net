import { Col } from 'react-bootstrap';

import './HiscoresHeader.scss';

interface HiscoresHeaderProps {
  type: string;
  page: number;
  pageLength: number;
  onPageChangeHandler: (page: number) => void;
}

const HiscoresHeader = (props: HiscoresHeaderProps) => (
  <Col md={{ span: 8, offset: 2 }} className='hiscores-header d-flex justify-content-between'>
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
  </Col>
)

export default HiscoresHeader;
