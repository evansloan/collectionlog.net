import React from 'react';
import DocumentMeta from 'react-document-meta';

import { CollectionLogAPI } from '../../api/CollectionLogAPI';
import { HiscoresList, HiscoresNav } from '@components/hiscores';
import { Container } from '@components/layout';
import { updateUrl, withParams } from '@utils/components';
import { capitalize } from '@utils/format';

interface HiscoresParams {
  type: string;
  page: string;
}

interface HiscoresProps {
  params: HiscoresParams;
};

interface HiscoresState {
  type: string;
  page: number;
  filter: string;
  data: any[];
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

  updateHiscores = async() => {
    const api = new CollectionLogAPI();

    const res = await api.getHiscores(this.state.type, this.state.page, this.state.filter);
    this.setState({
      ...this.state,
      data: res.data,
      error: null,
      isLoaded: true,
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
    const accountType = filter.replace(/ /g, '_');

    this.setState({
      ...this.state,
      filter: accountType,
      page: 1,
      isLoaded: false,
    }, () => {
      this.updateHiscores();
    });
  }

  render() {
    const meta = {
      title: `${capitalize(this.state.type)} Hiscores | Page ${this.state.page}`,
    };
    return (
      <Container>
        <DocumentMeta {...meta} />
        <HiscoresNav
          type={this.state.type}
          page={this.state.page}
          pageLength={this.state.data.length}
          onPageChangeHandler={this.onPageChange}
          onFilterChangeHandler={this.onFilterChange}
          showFilters={true}
          showTitle={true}
        />
        <HiscoresList page={this.state.page} data={this.state.data} isLoaded={this.state.isLoaded} />
        <HiscoresNav
          type={this.state.type}
          page={this.state.page}
          pageLength={this.state.data.length}
          onPageChangeHandler={this.onPageChange}
          onFilterChangeHandler={this.onFilterChange}
          showFilters={false}
          showTitle={false}
        />
      </Container>
    );
  }
}

export default withParams(Hiscores);
