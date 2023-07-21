import { useQuery } from '@tanstack/react-query';
import { CollectionLogAPI } from '../../api/collection-log/collection-log-api';

const api = CollectionLogAPI.getInstance();

export const useRanks = (username: string) => {
  username = username.toLowerCase();
  const query = useQuery({
    queryKey: ['ranks', username],
    queryFn: async () => await api.getRanksByUsername(username),
  });

  return { ranks: query.data, ...query };
};