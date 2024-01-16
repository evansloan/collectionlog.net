import React from 'react';

import ChangeLogSection from '@/components/home/change-log-section';
import { Accordion } from '@/components/ui/accordion';
import { getLatestReleases } from '@/lib/api/github/github-api';

const ChangeLog = async () => {
  const { api, plugin, site } = await getLatestReleases();

  return (
    <Accordion type='single' collapsible className='w-full p-4 md:w-2/3'>
      <ChangeLogSection
        releases={site}
        title='collectionlog.net'
        value='collection-log-net'
      />
      <ChangeLogSection
        releases={api}
        title='api.collectionlog.net'
        value='collection-log-api'
      />
      <ChangeLogSection
        releases={plugin}
        title='RuneLite plugin'
        value='collection-log-plugin'
      />
    </Accordion>
  );
};

export default ChangeLog;
