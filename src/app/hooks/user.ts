import { useQuery } from '@tanstack/react-query';
import { CollectionLogAPI } from '../../api/collection-log/collection-log-api';

const api = CollectionLogAPI.getInstance();

export const useUserSettings = (username: string) => {
  username = username.toLowerCase().trim();
  const query = useQuery({
    queryKey: ['user-settings', username],
    queryFn: async () => await api.getUserSettings(username),
  });

  return { ...query, userSettings: query.data };
};