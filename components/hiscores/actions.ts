'use server';

import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';

export const getUserPage = async (username: string, accountType: RankType) => {
  const rank = await CollectionLogAPI.getRankByUsername(
    username.toLowerCase().trim(),
    accountType
  );
  return rank != 0 ? Math.ceil(rank / 25) : undefined;
};
