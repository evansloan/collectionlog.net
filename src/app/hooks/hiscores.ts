import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
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

export const useHiscores = (page: number, filter: RankType, username?: string) => {
  const [hsPage, setHsPage] = useState(page);
  const query = useQuery({
    queryKey: ['hiscores', page, filter, username],
    queryFn: async () => {
      if (username) {
        const rank = await api.getRankByUsername(username.toLowerCase().trim(), filter);
        page = rank != 0 ? Math.ceil(rank / 25) : 1;
      }

      setHsPage(page);
      return { hiscores: await api.getHiscores(page, filter), page };
    },
  });

  // TODO: Page not updated on search of cached user

  return {
    ...query,
    hiscores: query.data?.hiscores,
    page: hsPage,
    setPage: setHsPage,
  };
};