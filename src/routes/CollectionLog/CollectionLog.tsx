import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { LogBody, LogEntryList, LogHeader, LogItems, LogTabList } from '../../components/CollectionLog/index';

import './CollectionLog.scss';

import entryList from '../../data/entries.json';


const withParams = (Component: typeof React.Component) => {
  return (props: any) => <Component {...props} params={useParams()} />;
}

interface CollectionLogProps {
  params: any;
}

interface CollectionLogState {
  collectionLogData: { [key: string]: any};
  activeTab: string;
  activeEntry: string;
  username: string;
  isLoaded: boolean;
  error: string | null;
}

class CollectionLog extends React.Component<CollectionLogProps, CollectionLogState> {

  constructor(props: CollectionLogProps) {
    super(props);

    const username = this.props.params.username;

    this.state = {
      collectionLogData: {},
      activeTab: '',
      activeEntry: '',
      username: '',
      isLoaded: false,
      error: null,
    };

    if (username) {
      this.updateCollectionLog(username);
    }
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      return;
    }

    this.updateUrl();
  }

  updateCollectionLog = (username: string) => {
    if (username.length < 1) {
      return;
    }

    const apiUrl = `https://api.collectionlog.net/collectionlog/user/${username}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.error) {
            this.setState({
              ...this.state,
              error: result.error,
            });
            return;
          }

          let tab = 'Bosses';
          let entry = 'Abyssal Sire';

          // If linked to a specific entry, find the tab that entry
          // is in
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
        },
        (error) => {
          this.setState({
            ...this.state,
            error: 'Error contacting collectionlog.net API',
          });
        }
      )
  }

  onTabChange = (event: React.MouseEvent<HTMLElement>) => {
    const tabName = (event.target as HTMLElement).dataset.tabname;
    if (!tabName) {
      return;
    }

    this.setState({
      ...this.state,
      activeTab: tabName,
      activeEntry: Object.keys(this.state.collectionLogData.tabs[tabName]).sort()[0],
    });
  }

  onEntryChange = (event: React.MouseEvent<HTMLElement>) => {
    const entryName = (event.target as HTMLElement).dataset.entryname;
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
  }

  getUniqueItemsCount = (): string => {
    let unique = 0;
    let totalUnique = 0;
    let uniqueItemsList: Array<number> = [];

    const tabs = this.state.collectionLogData.tabs;
    for (let tabName in tabs) {
      const entries = tabs[tabName];
      for (let entry in entries) {
        const items = entries[entry].items;
        for (let item of items) {
          if (uniqueItemsList.indexOf(item.id) == -1) {
            uniqueItemsList.push(item.id);
            unique = item.obtained ? unique + 1 : unique;
            totalUnique += 1;
          }
        }
      }
    }

    return `${unique}/${totalUnique}`;
  }

  updateUrl = () => {
    const newUrl = `/${this.state.username}/${this.state.activeEntry}`

    window.history.pushState({}, '', newUrl);
    window.history.replaceState({}, '', newUrl);
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
    const totalObtained = this.state.collectionLogData.total_obtained ?? 0;
    const totalItems = this.state.collectionLogData.total_items ?? 0;
    const totalCount = `${totalObtained}/${totalItems}`;
    const uniqueCount = this.getUniqueItemsCount();

    return (
      <Container>
        <Row className='d-none d-lg-flex'>
          <Col className='d-flex justify-content-center'>
            <a id='discord-invite' className='log-button' href='https://discord.gg/cFVa9BRSEN'>
              <img src='/discord.svg'></img>
              Join the Log Hunters Discord Server
            </a>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className='log-container'>
            <LogHeader 
              total={totalCount}
              unique={uniqueCount}
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
      </Container>
    );
  }
}

export default withParams(CollectionLog);
