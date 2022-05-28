import React from 'react';
import DocumentMeta from 'react-document-meta';

import { CollectionLogAPI } from '../../api/CollectionLogAPI';

import { Container } from '@components/layout';
import { FlexSection } from '@components/ui';

import {
  LogEntryList,
  LogHeader,
  LogRecentItems,
  LogItems,
  LogTabList
} from '@components/collectionlog';
import { updateUrl, withParams } from '@utils/components';

import entryList from '../../data/entries.json';
import type { CollectionLogData } from 'src/models/CollectionLog';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { fetchCollectionLog } from 'src/store/collectionlog/actions';
import { CollectionLogState } from 'src/store/collectionlog/slice';

interface CollectionLogParams {
  entry?: string;
  username?: string;
}

interface CollectionLogProps {
  params: CollectionLogParams;
}

// interface CollectionLogState {
//   data?: CollectionLogData;
//   recentItems: any[];
//   activeTab: string;
//   activeEntry: string;
//   username: string;
//   isLoaded: boolean;
//   error: string | null;
// }

class CollectionLog extends React.Component<CollectionLogProps> {
  // private api: CollectionLogAPI;
  // private initialState: CollectionLogState;
  private dispatch = useAppDispatch();
  state: CollectionLogState;

  constructor(props: CollectionLogProps) {
    super(props);

    this.state = useAppSelector((state) => state.collectionLog);

    // const username = this.props.params.username;

    // this.api = new CollectionLogAPI();
    // this.initialState = {
    //   recentItems: [],
    //   activeTab: '',
    //   activeEntry: '',
    //   username: username ?? '',
    //   isLoaded: false,
    //   error: null,
    // };

    // this.state = this.initialState;
  }

  componentDidMount() {
    const username = this.props.params.username;
    const tab = this.props.params;
    const entry = this.props.params.entry;
    if (!username) {
      return;
    }

    this.dispatch(fetchCollectionLog(username, entry));

    // this.updateCollectionLog(this.state.username);
    // this.updateRecentItems(this.state.username);
  }

  componentDidUpdate() {
    if (!this.state.isLoaded) {
      return;
    }

    const newUrl = `/${this.state.username}/${this.state.activeEntry}`
    updateUrl(newUrl);
  }

  updateCollectionLog = async(username: string) => {
    if (username.length < 1) {
      return;
    }

    const res = await this.api.getCollectionLog(username);

    if (res.data.error) {
      this.setState({
        ...this.initialState,
        error: res.data.error,
      });
      return;
    }

    const collectionLogData: CollectionLogData = res.data.collection_log;

    let tab = 'Bosses';
    let entry = 'Abyssal Sire';

    // If linked to a specific entry, find the tab that entry is in
    if (this.props.params.entry) {
      entry = this.props.params.entry;
      for (let tabName in collectionLogData.tabs) {
        if (entry in collectionLogData.tabs[tabName]) {
          tab = tabName;
          this.props.params.entry = undefined;
          break;
        }
      }
    }

    this.setState({
      data: collectionLogData,
      activeTab: tab,
      activeEntry: entry,
      username: username,
      isLoaded: true,
      error: this.getMissingEntries(collectionLogData.tabs),
    });
  }

  updateRecentItems = async(username: string) => {
    const res = await this.api.getRecentItems(username);

    if (res.data.error) {
      this.setState({
        ...this.state,
        isLoaded: false,
        error: res.data.error,
      });
      return;
    }

    this.setState({
      ...this.state,
      recentItems: res.data.items,
    });
  }

  onTabChange = (tabName: string) => {
    if (!tabName || !this.state.data) {
      return;
    }

    this.setState({
      ...this.state,
      activeTab: tabName,
      activeEntry: Object.keys(this.state.data.tabs[tabName]).sort()[0],
    });
  }

  onEntryChange = (entryName: string) => {
    if (!entryName) {
      return;
    }

    // Handle hiding/showing of entry list and items for mobile layout
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container')
    logList?.classList.add('hidden');
    logItems?.classList.remove('hidden');

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

  getItemCounts = (unique?: boolean): string => {
    if (!this.state.data) {
      return `${0}/${0}`;
    }

    const key = unique ? 'unique' : 'total';
    
    const obtained = this.state.data[`${key}_obtained`];
    const total = this.state.data[`${key}_items`];

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
    const totalCount = this.getItemCounts();
    const uniqueCount = this.getItemCounts(true);

    const headerData = {
      total: totalCount,
      unique: uniqueCount,
      accountType: this.state.data?.account_type,
      username: this.state.data?.username,
    };

    let pageTitle = 'Collection Log';

    let meta = {
      title: pageTitle,
      property: {
        'og:title': pageTitle,
        'twitter:title': pageTitle,
      },
      auto: {
        ograph: true,
      }
    };

    if (this.state.data?.username) {
      meta.title = `${this.state.data.username} | ${pageTitle}`;
    };

    return (
      <Container bgColor='bg-primary'>
        <DocumentMeta {...meta} />
        <LogHeader 
          data={headerData}
          onSearchHandler={this.onSearch}
          errorMessage={this.state.error}
        />
        {this.state.isLoaded &&
          <>
          <LogTabList activeTab={this.state.activeTab} onTabChangeHandler={this.onTabChange}/>
          <FlexSection
            height='h-[550px]'
            borderStyle='border-4 border-black border-t-0'
          >
            <LogEntryList
              activeEntry={this.state.activeEntry}
              activeTab={this.state.activeTab}
              entries={this.state.data?.tabs[this.state.activeTab]}
              onEntryChangeHandler={this.onEntryChange}
            />
            <LogItems
              entryName={this.state.activeEntry}
              data={this.state.data?.tabs[this.state.activeTab][this.state.activeEntry]}
            />
          </FlexSection>
          </>
        }
        {this.state.isLoaded &&
          <LogRecentItems items={this.state.recentItems} />
        }
      </Container>
    );
  }
}

export default withParams(CollectionLog);
