import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { AccountType, expectedMaxUniqueItems } from '../app/constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadCollectionLog,
  loadHiscoresRanks,
  loadRecentItems,
  loadUserSettings,
  setError,
} from '../app/reducers/log/slice';
import {
  AccountIcon,
  Button,
  Item,
  PageTitle,
  Spinner,
  Tabs,
} from '../components/elements';
import RankIcon from '../components/elements/RankIcon';
import { PageContainer, PageHeader } from '../components/layout';
import { formatDate, sortAlphabetical, updateUrl } from '../utils';

import AnalyticsService from '../services/analytics';

const DEFAULT_TAB = 'Bosses';
const DEFAULT_PAGE = 'Abyssal Sire';
const URL_PATH = 'log';

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

  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const [activeEntry, setActiveEntry] = useState(paramsEntry ?? DEFAULT_PAGE);

  const { collectionLog, isLoading, ranks, userSettings } = logState;
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

    dispatch(loadUserSettings(username));
    dispatch(loadCollectionLog(username));
    dispatch(loadRecentItems(username));
    dispatch(loadHiscoresRanks(username));
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
      const paramsTab = tabs.find((tabName) => {
        const entry = logState.collectionLog?.tabs[tabName][paramsEntry];
        return entry != undefined;
      });

      if (paramsTab) {
        setActiveTab(paramsTab);
        AnalyticsService.clTabChangeEvent(paramsTab, paramsEntry);
        return;
      }

      setActiveTab(DEFAULT_TAB);
      setActiveEntry(DEFAULT_PAGE);
      updateUrl(`/${URL_PATH}/${params.username}/${DEFAULT_PAGE}`);
    }

    AnalyticsService.clTabChangeEvent(DEFAULT_TAB, DEFAULT_PAGE);
  }, [logState.collectionLog]);

  const entryData = collectionLog?.tabs[activeTab][activeEntry];
  const obtainedCount = entryData?.items.filter((item) => item.obtained).length;
  const itemCount = entryData?.items.length;
  const recentItems = logState.recentItems;

  let obtainedClass = 'text-yellow';
  if (obtainedCount == itemCount) {
    obtainedClass = 'text-green';
  } else if (!obtainedCount) {
    obtainedClass = 'text-red';
  }

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
    setActiveTab(tabName);
    setActiveEntry(entries[0]);
    updateUrl(`/${URL_PATH}/${params.username}/${entries[0]}`);

    AnalyticsService.clTabChangeEvent(tabName, entries[0]);
  };

  const onEntryClick = (entryName: string) => {
    setActiveEntry(entryName);
    showEntries();
    updateUrl(`/${URL_PATH}/${params.username}/${entryName}`);

    AnalyticsService.clPageChangeEvent(entryName);
  };

  const showEntries = () => {
    const entryList = document.getElementById('entry-list');
    const entryItems = document.getElementById('entry-items');

    const isHidden = entryList?.classList.contains('hidden');

    if (isHidden) {
      entryList?.classList.remove('hidden');
      entryList?.classList.add('block');

      entryItems?.classList.add('hidden');
      entryItems?.classList.remove('flex');
    } else {
      entryList?.classList.add('hidden');
      entryList?.classList.remove('block');

      entryItems?.classList.add('flex');
      entryItems?.classList.remove('hidden');
    }
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

  let displayRank = undefined;
  if (ranks) {
    displayRank = ranks[userSettings?.displayRank ?? 'ALL'];
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
              <div className='flex justify-center items-center'>
                <p className='mx-2 text-lg font-bold text-center text-orange'>Obtained: <span className='text-white'>{collectionLog?.uniqueObtained}/{collectionLog?.uniqueItems}</span></p>
                <RankIcon rankType={userSettings?.displayRank ??'ALL'} height='15px' />
                <div className='group'>
                  <p className='mx-1 text-lg font-bold text-center text-orange'>
                    Rank <span className='text-white'>#{displayRank}</span>
                  </p>
                  <div className='hidden group-hover:flex group-hover:flex-col w-[5%] absolute p-2 bg-primary z-50 border-2 border-black'>
                    {ranks && Object.keys(ranks).map((rankType, i) => {
                      const rankValue = ranks[rankType as RankType];
                      if (!rankValue) {
                        return;
                      }
                      return <div key={`${i}-${rankType}`} className='flex justify-between items-center'>
                        <RankIcon rankType={rankType as RankType} height='15px' />
                        <p className='text-white font-bold'>#{rankValue}</p>
                      </div>;
                    })}
                  </div>
                </div>
                <FontAwesomeIcon icon={faChevronDown} className='h-[10px] mb-1 text-orange icon-shadow'/>
              </div>
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
                  if (tabName == 'Clues') {
                    entries = CLUE_TAB_ENTRIES;
                  }
                  return (
                    <div key={tabName} data-tab={tabName}>
                      <div className='flex w-full h-[94%] md:overflow-hidden'>
                        <div id='entry-list' className='pb-5 w-full md:w-1/4 h-full border-black border-r shadow-log overflow-y-scroll hidden md:block'>
                          {entries.map((entryName, i) => {
                            const entryItems = collectionLog.tabs[tabName][entryName]?.items;
                            const entryObtained = entryItems?.filter((item) => {
                              return item.obtained;
                            }).length;
                            const isComplete = entryObtained == entryItems?.length && entryItems;
                            const textColor = isComplete ? 'text-green' : 'text-orange';

                            let bg = i % 2 == 0 ? 'bg-primary' : 'bg-light';
                            bg = entryName == activeEntry ? 'bg-highlight' : bg;

                            return (
                              <p
                                className={`${bg} hover:bg-highlight ${textColor} text-lg cursor-pointer`}
                                onClick={() => onEntryClick(entryName)}
                                key={entryName}>
                                {entryName}
                              </p>
                            );
                          })}
                        </div>
                        <div id='entry-items' className='flex md:flex flex-col w-full md:w-3/4'>
                          <div className='mx-2 border-b border-b-lighter shadow-log'>
                            <Button title='Show Pages' className='w-full block md:hidden' onClick={showEntries} />
                            <h3 className='text-xl font-bold text-orange'>{activeEntry}</h3>
                            <p className='text-orange'>Obtained: <span className={obtainedClass}>{obtainedCount}/{itemCount}</span></p>
                            {entryData?.killCount?.map((kc, i) => {
                              return (
                                <p key={`${i}-${kc.name}`} className='text-orange'>
                                  {kc.name}: <span className='text-white'>{kc.amount}</span>
                                </p>
                              );
                            })}
                          </div>
                          <div className='flex flex-wrap grow content-start px-2 pt-3 mb-3 overflow-y-auto shadow-log'>
                            {entryData?.items.map((item, i) => {
                              return (
                                <Item key={`${i}-${item.id}`} item={item} showQuantity={userSettings?.showQuantity} showTooltip={true} />
                              );
                            })}
                          </div>
                        </div>
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