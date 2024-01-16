import React from 'react';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';
import { formatInt } from '@/lib/utils';

const UserCount = async () => {
  const userCount = await CollectionLogAPI.getUserCount();
  return (
    <CardHeader className='items-center'>
      <CardTitle>collectionlog.net</CardTitle>
      <CardDescription>{formatInt(userCount)} users clogging</CardDescription>
    </CardHeader>
  );
};

export default UserCount;
