import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { LogBody, LogEntryList, LogHeader, LogItems, LogTabList } from './CollectionLog/index';

import './CollectionLog.scss';


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
      isLoaded: false,
      error: null,
    };

    if (username) {
      this.updateCollectionLog(username);
    }
  }

  updateCollectionLog = (username: string) => {
    if (username.length < 1) {
      return;
    }

    const baseUrl = process.env.API_URL;
    const apiUrl = `${baseUrl}/collectionlog/user/${username}`;
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

          this.setState({
            collectionLogData: result.collection_log,
            activeTab: 'Bosses',
            activeEntry: 'Abyssal Sire',
            isLoaded: true,
            error: null,
          });

          const newUrl = `/${username}`

          window.history.pushState({}, '', newUrl);
          window.history.replaceState({}, '', newUrl);
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
      activeEntry: Object.keys(this.state.collectionLogData[tabName]).sort()[0],
    });
  }

  onEntryChange = (event: React.MouseEvent<HTMLElement>) => {
    const entryName = (event.target as HTMLElement).dataset.entryname;
    if (!entryName) {
      return;
    }

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

  render() {
    const totalObtained = this.state.collectionLogData.total_obtained;
    const totalItems = this.state.collectionLogData.total_items;
    const totalCount = `${totalObtained}/${totalItems}`;
    const uniqueCount = this.getUniqueItemsCount();

    return (
      <Container>
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
