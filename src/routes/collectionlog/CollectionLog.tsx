import { useEffect } from 'react';
import DocumentMeta from 'react-document-meta';
import { useParams } from 'react-router';

import {
  LogEntryList,
  LogHeader,
  LogRecentItems,
  LogItems,
  LogTabList
} from '@components/collectionlog';
import { Container } from '@components/layout';
import { FlexSection, Spinner } from '@components/ui';

import { fetchCollectionLog, fetchRecentItems } from '@store/collectionlog/actions';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';


const CollectionLog = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.collectionLog);
  const params = useParams();

  useEffect(() => {
    const username = params.username;
    const entry = params.entry;

    if (!username || state.username || state.isLoaded) {
      return;
    }

    console.log('useeffect');
  
    dispatch(fetchCollectionLog(username, entry));
  }, [dispatch, state.isLoaded, state.username, params.username, params.entry]);

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

  if (state.data?.username) {
    meta.title = `${state.data.username} | ${pageTitle}`;
  };

  console.log('render');
  return (
    <Container bgColor='bg-primary'>
      <DocumentMeta {...meta} />
      <LogHeader />
      {state.isLoading &&
        <FlexSection
          height='h-[550px]'
          borderStyle='border-4 border-black border-t-0'
        >
          <Spinner />
        </FlexSection>
      }
      {state.isLoaded &&
        <>
        <LogTabList />
        <FlexSection
          height='h-[550px]'
          borderStyle='border-4 border-black border-t-0'
        >
          <LogEntryList />
          <LogItems />
        </FlexSection>
        </>
      }
      {state.isLoaded &&
        <LogRecentItems items={state.recentItems} />
      }
    </Container>
  );
}

export default CollectionLog;
