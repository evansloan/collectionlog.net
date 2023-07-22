import { useQuery } from '@tanstack/react-query';
import TwitchAPI from '../../api/twitch/twitch-api';

const api = TwitchAPI.getInstance();

export const useTwitchStreams = () => {
  const query = useQuery({
    queryKey: ['twitch-streams'],
    queryFn: async () => await api.getStreams(),
  });

  return { ...query, streams: query.data };
};
