import { Col, Row } from 'react-bootstrap';

import { capitalize } from '../../../utils/componentUtils';

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
      {props.data.map((user: any, index: number) => {
        return (
          <Row key={`${user.username}${index}`} className='hiscore justify-content-space-between'>
            <Col xs='auto' sm={4}>
              <p className='rank'>{(pageLimit * (props.page - 1)) + (index + 1)}.</p>
            </Col>
            <Col xs='auto' sm={4} className='d-flex justify-content-center align-items-center'>
              {user.account_type && user.account_type != 'NORMAL' &&
                <img src={`https://oldschool.runescape.wiki/images/${capitalize(user.account_type)}_chat_badge.png`} />
              }
              <p className='username'>
                <a href={`/${user.username}`}>{user.username}</a>
              </p>
            </Col>
            <Col xs='auto' sm={4}>
              <p className='counts'>{user.obtained}/{user.total}</p>
            </Col>
          </Row>
        );
      })}
    </Col>
  );
}

export default HiscoresList;
