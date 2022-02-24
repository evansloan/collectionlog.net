import React from 'react';
import { Container, Row } from 'react-bootstrap';

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
  filter: string;
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
      filter: 'all',
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
    const pathParams = [this.state.type ,this.state.page];
    let queryParams = null;
    if (this.state.filter != 'all') {
      queryParams = {
        accountType: this.state.filter.toUpperCase(),
      };
    }

    getRequest('hiscores', pathParams, queryParams, (result) => {
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
    });
  }

  onPageChange = (page: number) => {
    this.setState({
      ...this.state,
      isLoaded: false,
      page: page,
    }, () => {
      this.updateHiscores();
    });
  }

  onFilterChange = (filter: string) => {
    const prevFilterLinkId = `filter-${this.state.filter.replace(/_/g, '-')}`;
    const filterLinkId = `filter-${filter}`;
    const accountType = filter.replace(/-/g, '_');

    document.getElementById(prevFilterLinkId)?.classList.remove('filter-active');
    document.getElementById(filterLinkId)?.classList.add('filter-active');

    this.setState({
      ...this.state,
      filter: accountType,
      isLoaded: false,
    }, () => {
      this.updateHiscores();
    });
  }

  render() {
    return (
      <Container className='hiscores-container'>
        <HiscoresHeader
          type={this.state.type}
          page={this.state.page}
          pageLength={this.state.data.length}
          onPageChangeHandler={this.onPageChange}
          onFilterChangeHandler={this.onFilterChange}
        />
        <Row>
          <HiscoresList page={this.state.page} data={this.state.data} isLoaded={this.state.isLoaded} />
        </Row>
      </Container>
    );
  }
}

export default withParams(Hiscores);
