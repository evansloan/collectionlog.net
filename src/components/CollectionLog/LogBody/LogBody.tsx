import { Col, Row } from 'react-bootstrap';

import './LogBody.scss';

const LogBody = (props: any) => (
  <Row>
    <Col md='12' className='log-body'>
      <Row>
        {props.children}
      </Row>
    </Col>
  </Row>
);

export default LogBody;
