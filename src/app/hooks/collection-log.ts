import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { CollectionLogAPI } from '../../api/collection-log/collection-log-api';
import CollectionLogService from '../../services/collection-log';

const api = CollectionLogAPI.getInstance();

export const useCollectionLog = (username: string) => {
  username = username.toLowerCase();
  const [collectionLogService, setCollectionLogService] = useState<CollectionLogService>();
  const query = useQuery({
    queryKey: ['collection-log', username],
    queryFn: async () => await api.getCollectionLog(username),
  });

  useEffect(() => {
    if (!query.data) {
      return;
    }
    setCollectionLogService(new CollectionLogService(query.data));
  }, [query.data]);

  return { collectionLog: collectionLogService, ...query };
};

export const useRecentItems = (username: string) => {
  username = username.toLowerCase();
  const query = useQuery({
    queryKey: ['recent-items', username],
    queryFn: async () => await api.getRecentItems(username),
  });

  return { recentItems: query.data, ...query };
};
