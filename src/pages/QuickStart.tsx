import React from 'react';
import DocumentMeta from 'react-document-meta';
import { PageTitle } from '../components/elements';
import { PageContainer, PageHeader } from '../components/layout';

const pageTitle = 'Quick start';

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

const QuickStart = () => {
  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      <PageHeader>
        <PageTitle
          title={pageTitle}
        />
      </PageHeader>
      <div className='flex flex-col items-center md:mx-3 mb-3 md:mt-1 h-full border-2 border-light overflow-hidden'>
        <ol className='text-white text-lg w-3/4'>
          <li>1. Enable the collectionlog.net connections plugin config.</li>
          <li>2. Open your collection log and open each page in the log in order for the plugin to grab your collection log data. Pages marked with '*' have yet to be opened</li>
          <li>3. Upload your collection log by clicking on the upload button in the account tab in the plugin side panel. Your collection log will also be uploaded automatically upon log out providing the collection log has been opened in-game at least once while logged in.</li>
        </ol>
      </div>
    </PageContainer>
  );
};

export default QuickStart;