import React from 'react';
import DocumentMeta from 'react-document-meta';
import { PageTitle, Tabs } from '../components/elements';
import { PageContainer, PageHeader } from '../components/layout';

const pageTitle = 'Change log';

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

const ChangeLog = () => {
  return (
    <PageContainer>
      <DocumentMeta {...meta} />
      <PageHeader>
        <PageTitle
          title={pageTitle}
        />
      </PageHeader>
      <div className='flex flex-col md:mx-3 mb-3 md:mt-1 h-full border-2 border-t-0 border-light md:rounded-tr-[10px] md:rounded-tl-[10px] overflow-hidden'>
        <Tabs>
          <div data-tab='collectionlog.net'>
            <h3 className='text-center'>collectionlog.net changes</h3>
            <div className='h-full overflow-hidden flex flex-col items-center'>
              <div>
                <h4 className='text-yellow text-lg'>2024-01-16</h4>
                <ul className='text-white'>
                  <li>Add change log page</li>
                  <li>Add quick start page</li>
                  <li>Add FAQ page</li>
                </ul>
              </div>
            </div>
          </div>
          <div data-tab='Plugin'>
            <h3 className='text-center'>Plugin changes</h3>
            <div className='h-full overflow-hidden flex flex-col items-center'>
              <div>
                <h4 className='text-yellow text-lg'>2024-01-16</h4>
                <ul className='text-white'>
                  <li>Add loading message on !log command</li>
                  <li>Add error message on !log command when API connection config is disabled</li>
                  <li>Add links to change log/quick start/FAQ pages in side panel</li>
                </ul>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default ChangeLog;