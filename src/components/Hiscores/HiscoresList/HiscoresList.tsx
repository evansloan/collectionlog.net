import { Col, Row } from 'react-bootstrap';

import './HiscoresList.scss';

interface HiscoresListProps {
  page: number;
  data: Array<any>;
  isLoaded: boolean;
}

const HiscoresList = (props: HiscoresListProps) => {
  const pageLimit = 25;

  return (
    <Col md={{span: 8, offset: 2}} className='hiscores-list'>
      <Row>
        <Col>
          <h3>Rank</h3>
        </Col>
        <Col>
          <h3>Username</h3>
        </Col>
        <Col>
          <h3>Totals</h3>
        </Col>
      </Row>
      {props.data.map((user: any, index: number) => {
        return (
          <Row className='hiscore'>
            <Col>
              <p className='rank'>{(pageLimit * (props.page - 1)) + (index + 1)}.</p>
            </Col>
            <Col>
              <p className='username'><a href={`/${user.username}`}>{user.username}</a></p>
            </Col>
            <Col>
              <p className='counts'>{user.obtained}/{user.total}</p>
            </Col>
          </Row>
        );
      })}
    </Col>
  );
}

export default HiscoresList;
