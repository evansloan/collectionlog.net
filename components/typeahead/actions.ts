'use server';

import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';

export const fetchUserTypeahead = async (username: string) => {
  return await CollectionLogAPI.getUserTypeahead(username);
};
