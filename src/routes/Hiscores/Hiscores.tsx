import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getRequest } from '../../api/Client';
import { HiscoresHeader, HiscoresList } from '../../components/Hiscores';
import { updateUrl, withParams } from '../../utils/componentUtils';

import './Hiscores.scss';

interface HiscoresProps {
  params: any;
};

interface HiscoresState {
  type: string;
  page: number;
  data: Array<any>;
  error: string | null;
  isLoaded: boolean;
}

class Hiscores extends React.Component<HiscoresProps, HiscoresState> {
  pageLimit: number;

  constructor(props: HiscoresProps) {
    super(props);

    this.pageLimit = 25;

    const hiscoreType = this.props.params.type;
    let page = parseInt(this.props.params.page);

    if (!page) {
      page = 1;
    }

    this.state = {
      type: hiscoreType,
      page: page,
      data: [],
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.updateHiscores();
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      return;
    }

    const newUrl = `/hiscores/${this.state.type}/${this.state.page}`;
    updateUrl(newUrl);
  }

  updateHiscores = () => {
    getRequest('hiscores', [this.state.type, this.state.page], (result) => {
      this.setState({
        ...this.state,
        data: result,
        error: null,
        isLoaded: true,
      });
    }, (error) => {
      this.setState({
        ...this.state,
        error: 'Error contacting collectionlog.net API',
        isLoaded: false,
      });
    }, true);
  }

  onPageChange = (page: number) => {
    this.setState({
      ...this.state,
      isLoaded: false,
      page: page,
    }, () => {
      this.updateHiscores();
    })
  }

  render() {
    return (
      <Container className='hiscores-container'>
        <Row>
          <HiscoresHeader
            type={this.state.type}
            page={this.state.page}
            pageLength={this.state.data.length}
            onPageChangeHandler={this.onPageChange}
          />
        </Row>
        <Row>
          <HiscoresList page={this.state.page} data={this.state.data} isLoaded={this.state.isLoaded} />
        </Row>
      </Container>
    );
  }
}

export default withParams(Hiscores);
