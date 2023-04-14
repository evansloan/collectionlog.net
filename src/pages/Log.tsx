import { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadCollectionLog,
  loadHiscoresRank,
  loadRecentItems,
  setError,
} from '../app/reducers/log/slice';
import {
  Spinner,
  Tabs,
} from '../components/elements';
import { PageContainer } from '../components/layout';
import { sortAlphabetical, updateUrl } from '../utils';
import EntryList from '../components/log/EntryList';
import EntryItems from '../components/log/EntryItems';
import RecentItems from '../components/log/RecentItems';
import LogHeader from '../components/log/LogHeader';

const TABS = [
  'Bosses',
  'Raids',
  'Clues',
  'Minigames',
  'Other',
];

const CLUE_TAB_ENTRIES = [
  'Beginner Treasure Trails',
  'Easy Treasure Trails',
  'Medium Treasure Trails',
  'Hard Treasure Trails',
  'Elite Treasure Trails',
  'Master Treasure Trails',
  'Hard Treasure Trails (Rare)',
  'Elite Treasure Trails (Rare)',
  'Master Treasure Trails (Rare)',
  'Shared Treasure Trail Rewards',
];

const Log = () => {
  const logState = useAppSelector((state) => state.log);
  const dispatch = useAppDispatch();
  const params = useParams();

  const paramsEntry = params.entry;
  let paramsTab = undefined;

  const [activeTab, setActiveTab] = useState('Bosses');
  const [activeEntry, setActiveEntry] = useState(paramsEntry ?? 'Abyssal Sire');

  const { collectionLog, isLoading } = logState;
  const tabKeys = Object.keys(collectionLog?.tabs || []);

  /**
   * Alphabetical sorted tabs that are matched between the TAB constant and the retrieved tab from the collectionLog
   */
  const tabs = TABS.filter((staticTab) => tabKeys.some((tabKey) => staticTab == tabKey));

  /**
   * Load collection log data from API.
   *
   * Called on search
   */
  useEffect(() => {
    const username = params.username?.trim();
    if (!username) {
      return;
    }

    dispatch(loadCollectionLog(username));
    dispatch(loadRecentItems(username));
    dispatch(loadHiscoresRank(username));
  }, [params.username]);

  /**
   * Find the tab the entry provided in URL
   * belongs to.
   *
   * Called on collection log data load
   */
  useEffect(() => {
    if (!logState.collectionLog) {
      dispatch(setError(`Unable to find collection log for user ${params.username}`));
      return;
    }

    if (paramsEntry) {
      paramsTab = tabs.find((tabName) => {
        const entry = logState.collectionLog?.tabs[tabName][paramsEntry];
        return entry != undefined;
      });
      setActiveTab(paramsTab ?? 'Bosses');
    }
  }, [logState.collectionLog]);

  const entryData = collectionLog?.tabs[activeTab][activeEntry];

  const onTabClick = (tabName: string) => {
    const entries = sortAlphabetical(Object.keys(collectionLog?.tabs[tabName] ?? []));
    setActiveTab(tabName);
    setActiveEntry(entries[0]);
    updateUrl(`/log/${params.username}/${entries[0]}`);
  };

  const pageTitle = 'Collection Log';

  const meta = {
    title: pageTitle,
    property: {
      'og:title': pageTitle,
      'twitter:title': pageTitle,
    },
    auto: {
      ograph: true,
    },
  };

  if (collectionLog?.username) {
    meta.title = `${collectionLog.username} | ${pageTitle}`;
  }

  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      {isLoading ?
        <Spinner />
        : logState.error && !logState.collectionLog ?
          <div className='flex justify-center items-center'>
            <h1 className='text-error'>{logState.error}</h1>
          </div>
          :
          <>
            <LogHeader />
            <div className='md:mx-3 mb-3 md:mt-1 h-full border-2 border-t-0 border-light md:rounded-tr-[10px] md:rounded-tl-[10px] md:overflow-hidden'>
              <Tabs activeTab={activeTab} onClick={onTabClick}>
                {collectionLog && tabs.map((tabName) => {
                  let entries = sortAlphabetical(Object.keys(collectionLog.tabs[tabName] ?? []));
                  // Override alphabetical sort for clues
                  if (tabName == 'Clues' && collectionLog.tabs[tabName]) {
                    entries = CLUE_TAB_ENTRIES;
                  }

                  return (
                    <div key={tabName} data-tab={tabName}>
                      <div className='flex w-full h-[94%] md:overflow-hidden'>
                        <EntryList collectionLog={collectionLog} entries={entries} tabName={tabName} activeEntryState={[activeEntry, setActiveEntry]}/>
                        {entryData && <EntryItems name={activeEntry} items={entryData.items || []} killCount={entryData.killCount || []}/>}
                      </div>
                    </div>
                  );
                })}
              </Tabs>
            </div>
            <RecentItems/>
          </>
      }
    </PageContainer>
  );
};

export default Log;