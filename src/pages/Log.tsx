import { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { AccountType, expectedMaxUniqueItems } from '../app/constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadCollectionLog,
  loadHiscoresRank,
  loadRecentItems,
  setError,
} from '../app/reducers/log/slice';
import {
  AccountIcon,
  Item,
  PageTitle,
  Spinner,
  Tabs,
} from '../components/elements';
import { PageContainer, PageHeader } from '../components/layout';
import { formatDate, sortAlphabetical, updateUrl } from '../utils';
import EntryList from '../components/log/EntryList';
import EntryItems from '../components/log/EntryItems';

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
    console.log(logState.collectionLog);

    if (paramsEntry) {
      paramsTab = tabs.find((tabName) => {
        const entry = logState.collectionLog?.tabs[tabName][paramsEntry];
        return entry != undefined;
      });
      setActiveTab(paramsTab ?? 'Bosses');
    }
  }, [logState.collectionLog]);

  const entryData = collectionLog?.tabs[activeTab][activeEntry];
  const recentItems = logState.recentItems;

  /**
   * Explicitly iterate through and count the unique items that have been obtained.
   *
   * This value can be compared to the total uniques collected. If the values do not match, it is an indicator that a sync is needed for some entries.
   */
  const countObtainedUniques = (collectionLog: CollectionLog | undefined): number => {
    if (collectionLog === undefined) {
      return 0;
    }

    const uniqueItemIds = new Set<number>();
    for(const tabKey in collectionLog.tabs) {
      const tab = collectionLog.tabs[tabKey];

      for(const collectionLogEntryKey in tab) {
        const collectionLogEntry = tab[collectionLogEntryKey];

        for(const item of collectionLogEntry.items) {
          if (item.obtained && !uniqueItemIds.has(item.id)) {
            uniqueItemIds.add(item.id);
          }
        }
      }
    }
    return uniqueItemIds.size;
  };

  const explicitlyCountedUniques = countObtainedUniques(collectionLog);

  const onTabClick = (tabName: string) => {
    const entries = sortAlphabetical(Object.keys(collectionLog?.tabs[tabName] ?? []));
    console.log(entries[0]);
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
            <PageHeader className='flex-col'>
              <div className='flex justify-center items-center'>
                <AccountIcon accountType={collectionLog?.accountType as AccountType} height='20px' />
                <PageTitle title={`${collectionLog?.username}'s Collection log`} />
              </div>
              <p className='text-lg font-bold text-center text-orange'>
                Obtained: <span className='text-white'>{collectionLog?.uniqueObtained}/{collectionLog?.uniqueItems}</span> {' '}
                Rank: <span className='text-white'>#{logState.rank}</span>
              </p>
              {collectionLog && collectionLog?.uniqueItems < expectedMaxUniqueItems &&
                <p className='text-lg font-bold text-center text-yellow'>
                  New unique items have been added to Old School RuneScape! Please re-upload collection log data.
                </p>
              }
              {collectionLog && collectionLog?.uniqueObtained !== explicitlyCountedUniques &&
                <p className='text-lg font-bold text-center text-yellow'>
                  Total obtained does not match specific items collected. Please re-upload collection log data.
                </p>
              }
            </PageHeader>
            <div className='md:mx-3 mb-3 md:mt-1 h-full border-2 border-t-0 border-light md:rounded-tr-[10px] md:rounded-tl-[10px] md:overflow-hidden'>
              <Tabs activeTab={activeTab} onClick={onTabClick}>
                {collectionLog && tabs.map((tabName) => {
                  let entries = sortAlphabetical(Object.keys(collectionLog.tabs[tabName] ?? []));
                  // Override alphabetical sort for clues
                  if (tabName == 'Clues' && collectionLog?.tabs[tabName]) {
                    entries = CLUE_TAB_ENTRIES;
                  }

                  return (
                    <div key={tabName} data-tab={tabName}>
                      <div className='flex w-full h-[94%] md:overflow-hidden'>
                        <EntryList collectionLog={collectionLog} entries={entries} tabName={tabName}/>
                        <EntryItems items={entryData?.items || []} killCount={entryData?.killCount || []}/>
                      </div>
                    </div>
                  );
                })}
              </Tabs>
            </div>
            <div>
              <PageHeader className='border-black border-t-4'>
                <PageTitle title='Recent items' />
              </PageHeader>
              <div className='flex sm:flex-wrap flex-col sm:flex-row justify-center sm:justify-around grow p-2 mt-[10px]'>
                {recentItems?.map((item, i) => {
                  return (
                    <div key={`${i}-${item.id}`} className='flex flex-wrap justify-center grow'>
                      <Item item={item} showQuantity={false} isDetail={true}/>
                      <div className='flex flex-col'>
                        <p>{item.name}</p>
                        <p>{formatDate(item.obtainedAt as string)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
      }
    </PageContainer>
  );
};

export default Log;