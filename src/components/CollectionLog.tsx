import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { LogBody, LogEntryList, LogHeader, LogItems, LogTabList } from './CollectionLog/index';

import './CollectionLog.scss';


const withParams = (Component: typeof React.Component) => {
  return (props: any) => <Component {...props} params={useParams()} />;
}

type CollectionLogProps = {
  params: any;
};

type CollectionLogState = {
  collectionLogData: { [key: string]: any};
  activeTab: string;
  activeEntry: string;
  isLoaded: boolean;
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
    };

    if (username) {
      this.updateCollectionLog(username);
    }
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
            return;
          }

          this.setState({
            collectionLogData: result.collection_log,
            activeTab: 'Bosses',
            activeEntry: 'Abyssal Sire',
            isLoaded: true,
          });

          const newUrl = `/${username}`
          const nextState = { additionalInformation: 'Updated the URL with JS' };

          window.history.pushState(nextState, '', newUrl);
          window.history.replaceState(nextState, '', newUrl);
        },
        (error) => {
          console.log('Unable to find collection log for user ', username);
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

  onEntryChange = (event: React.MouseEvent, entryName: string) => {
    this.setState({
      ...this.state,
      activeEntry: entryName,
    });
  }

  onSearch = (event: React.FormEvent, username: string) => {
    event.preventDefault();
    this.updateCollectionLog(username);
  }

  render() {
    let obtained = 0;
    let total = 0;
    let unique = 0;
    let totalUnique = 0;
    let uniqueItemsList: Array<number> = [];

    for (let tabName in this.state.collectionLogData) {
      const entries = this.state.collectionLogData[tabName];
      for (let entry in entries) {
        const items = entries[entry].items;
        total += items.length;
        for (let item of items) {
            if (uniqueItemsList.indexOf(item.id) == -1) {
              uniqueItemsList.push(item.id);
              unique = item.obtained ? unique + 1 : unique;
              totalUnique += 1;
            }
            obtained = item.obtained ? obtained + 1 : obtained;
        }
      }
    }

    const totalCount = `${obtained}/${total}`;
    const uniqueCount = `${unique}/${totalUnique}`;

    return (
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className='log-container'>
            <LogHeader total={totalCount} unique={uniqueCount} onSearchHandler={this.onSearch} />
            {this.state.isLoaded &&
              <>
              <LogTabList onTabChangeHandler={this.onTabChange}/>
              <LogBody>
                <LogEntryList
                  entries={this.state.collectionLogData[this.state.activeTab]}
                  onEntryChangeHandler={this.onEntryChange}
                />
                <LogItems
                  entryName={this.state.activeEntry}
                  data={this.state.collectionLogData[this.state.activeTab][this.state.activeEntry]}
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
