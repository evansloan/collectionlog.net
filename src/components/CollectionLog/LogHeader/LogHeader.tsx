import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { capitalize } from '../../../utils/componentUtils';

import './LogHeader.scss';

interface LogHeaderProps {
  data: any;
  errorMessage: string | null;
  onSearchHandler: (event: React.FormEvent, username: string) => void;
}

interface LogHeaderState {
  username: string;
}

class LogHeader extends React.Component<LogHeaderProps, LogHeaderState> {

  constructor(props: LogHeaderProps) {
    super(props);
    this.state = {
      username: '',
    };
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <Row>
        <Col md='12' className='log-header d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between'>
          <form onSubmit={(e) => this.props.onSearchHandler(e, this.state.username)}>
            <input type='text' name='activeUser' placeholder='Enter username...' onChange={(e) => this.onUsernameChange(e)}></input>
            <button className='log-button' type='submit'>Search</button>
          </form>
          <h4 className='text-orange text-shadow text-center font-weight-bold'>
            {this.props.data.accountType &&
              <img src={`https://oldschool.runescape.wiki/images/${capitalize(this.props.data.accountType)}_chat_badge.png`} />
            }
            {this.props.data.username &&
              `${this.props.data.username}'s `
            }
            Collection Log
            <p>Unique: <span className='text-white'>{this.props.data.unique}</span> Total: <span className='text-white'>{this.props.data.total}</span></p>
          </h4>
          {this.props.errorMessage ?
            <div className='error-message'><p>{this.props.errorMessage}</p></div>
            :
            <div className='spacer d-none d-lg-block'></div>
          }
        </Col>
      </Row>
    );
  }
}

export default LogHeader;
