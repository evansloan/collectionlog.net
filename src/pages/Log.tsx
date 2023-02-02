import { useEffect, useState } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { AccountType } from '../app/constants';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadCollectionLog,
  loadHiscoresRank,
  loadRecentItems,
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
import { PageContainer, PageHeader } from '../components/layout';
import { formatDate, sortAlphabetical, updateUrl } from '../utils';

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
      paramsTab = TABS.find((tabName) => {
        const entry = logState.collectionLog?.tabs[tabName][paramsEntry];
        return entry != undefined;
      });
      setActiveTab(paramsTab ?? 'Bosses');
    }
  }, [logState.collectionLog]);

  const { collectionLog, isLoading } = logState;

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

  const onTabClick = (tabName: string) => {
    const entries = sortAlphabetical(Object.keys(collectionLog?.tabs[tabName] ?? []));
    setActiveTab(tabName);
    setActiveEntry(entries[0]);
    updateUrl(`/log/${params.username}/${entries[0]}`);
  };

  const onEntryClick = (entryName: string) => {
    setActiveEntry(entryName);
    showEntries();
    updateUrl(`/log/${params.username}/${entryName}`);
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
            </PageHeader>
            <div className='md:mx-3 mb-3 md:mt-1 h-full border-2 border-t-0 border-light md:rounded-tr-[10px] md:rounded-tl-[10px] md:overflow-hidden'>
              <Tabs activeTab={activeTab} onClick={onTabClick}>
                {TABS.map((tabName) => {
                  let entries = sortAlphabetical(Object.keys(collectionLog?.tabs[tabName] ?? []));
                  // Override alphabetical sort for clues
                  if (tabName == 'Clues') {
                    entries = CLUE_TAB_ENTRIES;
                  }

                  return (
                    <div key={tabName} data-tab={tabName}>
                      <div className='flex w-full h-[94%] md:overflow-hidden'>
                        <div id='entry-list' className='pb-5 w-full md:w-1/4 h-full border-black border-r shadow-log overflow-y-scroll hidden md:block'>
                          {entries.map((entryName, i) => {
                            const entryItems = collectionLog?.tabs[tabName][entryName]?.items;
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
                                <Item key={`${i}-${item.id}`} item={item} showQuantity={true} showTooltip={true} />
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