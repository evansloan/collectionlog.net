import { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  loadCollectionLog,
  loadHiscoresRank,
  loadRecentItems,
} from '../app/reducers/log/slice';
import {
  Spinner,
} from '../components/elements';
import { PageContainer } from '../components/layout';
import RecentItems from '../components/log/RecentItems';
import LogHeader from '../components/log/LogHeader';
import LogTab from '../components/log/LogTab';

const Log = () => {
  const logState = useAppSelector((state) => state.log);
  const dispatch = useAppDispatch();
  const params = useParams();

  const { collectionLog, isLoading } = logState;

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
            <LogTab />
            <RecentItems />
          </>
      }
    </PageContainer>
  );
};

export default Log;