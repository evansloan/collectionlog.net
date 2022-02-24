import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getRequest } from '../../api/Client';
import { LogBody, LogEntryList, LogHeader, LogRecentItems, LogItems, LogTabList } from '../../components/CollectionLog/index';
import { updateUrl, withParams } from '../../utils/componentUtils';

import './CollectionLog.scss';

import entryList from '../../data/entries.json';

interface CollectionLogProps {
  params: any;
}

interface CollectionLogState {
  collectionLogData: { [key: string]: any };
  recentItems: any[];
  activeTab: string;
  activeEntry: string;
  username: string;
  isLoaded: boolean;
  error: string | null;
}

class CollectionLog extends React.Component<CollectionLogProps, CollectionLogState> {

  initialState: CollectionLogState;

  constructor(props: CollectionLogProps) {
    super(props);

    const username = this.props.params.username;

    this.initialState = {
      collectionLogData: {},
      recentItems: [],
      activeTab: '',
      activeEntry: '',
      username: username ?? '',
      isLoaded: false,
      error: null,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    if (this.state.username == '') {
      return;
    }
    this.updateCollectionLog(this.state.username);
    this.updateRecentItems(this.state.username);
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      return;
    }

    const newUrl = `/${this.state.username}/${this.state.activeEntry}`
    updateUrl(newUrl);
  }

  updateCollectionLog = (username: string) => {
    if (username.length < 1) {
      return;
    }

    getRequest('collectionlog', ['user', username], null, (result) => {
      if (result.error) {
        this.setState({
          ...this.initialState,
          error: result.error,
        });
        return;
      }

      let tab = 'Bosses';
      let entry = 'Abyssal Sire';

      // If linked to a specific entry, find the tab that entry is in
      if (this.props.params.entry) {
        entry = this.props.params.entry;
        for (let key in result.collection_log.tabs) {
          if (entry in result.collection_log.tabs[key]) {
            tab = key;
            this.props.params.entry = null;
            break;
          }
        }
      }

      this.setState({
        collectionLogData: result.collection_log,
        activeTab: tab,
        activeEntry: entry,
        username: username,
        isLoaded: true,
        error: this.getMissingEntries(result.collection_log.tabs),
      });
    }, (error) => {
      this.setState({
        ...this.initialState,
        error: 'Error contacting collectionlog.net API',
      });
    });
  }

  updateRecentItems = (username: string) => {
    getRequest('collectionlog', ['recent', username], null, (result) => {
      if (result.error) {
        this.setState({
          ...this.state,
          isLoaded: false,
          error: result.error,
        });
        return;
      }

      this.setState({
        ...this.state,
        recentItems: result
      });
    }, (error) => {});
  }

  onTabChange = (tabName: string) => {
    if (!tabName) {
      return;
    }

    this.setState({
      ...this.state,
      activeTab: tabName,
      activeEntry: Object.keys(this.state.collectionLogData.tabs[tabName]).sort()[0],
    });
  }

  onEntryChange = (entryName: string) => {
    if (!entryName) {
      return;
    }

    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container')
    logList?.classList.add('d-none');
    logItems?.classList.remove('d-none');

    this.setState({
      ...this.state,
      activeEntry: entryName,
    });
  }

  onSearch = (event: React.FormEvent, username: string) => {
    event.preventDefault();
    this.updateCollectionLog(username);
    this.updateRecentItems(username);
  }

  getItemCounts = (unique: boolean): string => {
    let key = 'total';
    if (unique) {
      key = 'unique';
    }
    
    const obtained = this.state.collectionLogData[`${key}_obtained`] ?? 0;
    const total = this.state.collectionLogData[`${key}_items`] ?? 0;

    return `${obtained}/${total}`;
  }

  getMissingEntries = (collectionLogData: any) => {
    const loadedEntries = Object.keys(collectionLogData).map((tabName, _i) => {
      return Object.keys(collectionLogData[tabName]).map((entryName, _i) => {
        return entryName;
      });
    }).flat();

    let diff = entryList.filter((leftValue) => {
      return !loadedEntries.some((rightValue) => {
        return leftValue == rightValue;
      });
    });

    if (diff.length == 0) {
      return null;
    }

    if (diff.length > 3) {
      diff = diff.slice(0, 3);
      diff.push('and more...')
    }

    return `Missing collection log entries:\n${diff.join(', ')}`
  }

  render() {
    const totalCount = this.getItemCounts(false);
    const uniqueCount = this.getItemCounts(true);

    const headerData = {
      total: totalCount,
      unique: uniqueCount,
      accountType: this.state.collectionLogData.account_type,
      username: this.state.collectionLogData.username,
    };

    return (
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className='log-container'>
            <LogHeader 
              data={headerData}
              onSearchHandler={this.onSearch}
              errorMessage={this.state.error}
            />
            {this.state.isLoaded &&
              <>
              <LogTabList onTabChangeHandler={this.onTabChange}/>
              <LogBody>
                <LogEntryList
                  activeTab={this.state.activeTab}
                  entries={this.state.collectionLogData.tabs[this.state.activeTab]}
                  onEntryChangeHandler={this.onEntryChange}
                />
                <LogItems
                  entryName={this.state.activeEntry}
                  data={this.state.collectionLogData.tabs[this.state.activeTab][this.state.activeEntry]}
                />
              </LogBody>
              </>
            }
          </Col>
        </Row>
        {this.state.isLoaded &&
          <LogRecentItems items={this.state.recentItems} />
        }
      </Container>
    );
  }
}

export default withParams(CollectionLog);
