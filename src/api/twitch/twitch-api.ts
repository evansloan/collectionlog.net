import axios, { AxiosInstance } from 'axios';

export default class TwitchAPI {
  private static readonly AUTH_URL = 'https://id.twitch.tv/oauth2/token';
  private static readonly BASE_URL = 'https://api.twitch.tv/helix';

  private static readonly GAME_ID = '459931';

  private static readonly CLIENT_ID = process.env.REACT_APP_TWITCH_CLIENT_ID as string;
  private static readonly CLIENT_SECRET = process.env.REACT_APP_TWITCH_CLIENT_SECRET as string;
  private static readonly GRANT_TYPE = 'client_credentials';

  private static readonly SEARCH_KEYS = [
    'clog',
    'collection log',
    '!log',
  ];

  private static instance: TwitchAPI;
  private static axiosInstance: AxiosInstance;

  private accessToken: string|undefined = undefined;

  private constructor() {
    TwitchAPI.axiosInstance = axios.create({
      baseURL: TwitchAPI.BASE_URL,
    });
  }

  public static getInstance() {
    if (!TwitchAPI.instance) {
      TwitchAPI.instance = new TwitchAPI();
    }
    return TwitchAPI.instance;
  }

  public getAuth = async (): Promise<string> => {
    const params = {
      'client_id': TwitchAPI.CLIENT_ID,
      'client_secret': TwitchAPI.CLIENT_SECRET,
      'grant_type': TwitchAPI.GRANT_TYPE,
    };

    const res = await TwitchAPI.axiosInstance.post(
      TwitchAPI.AUTH_URL,
      params
    );

    return res.data.access_token;
  };

  public getStreams = async () => {
    if (!this.accessToken) {
      this.accessToken = await this.getAuth();
    }

    const url = 'streams';
    const params = {
      game_id: TwitchAPI.GAME_ID,
      type: 'live',
      after: null,
    };

    let res = await TwitchAPI.axiosInstance.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Client-Id': TwitchAPI.CLIENT_ID,
      },
    });

    const streams = res.data.data as any[];

    while (res.data.pagination.cursor) {
      params.after = res.data.pagination.cursor;
      res = await TwitchAPI.axiosInstance.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Client-Id': TwitchAPI.CLIENT_ID,
        },
      });

      streams.push(...res.data.data);
    }

    const logStreams: any[] = [];
    streams.forEach((stream) => {
      TwitchAPI.SEARCH_KEYS.forEach((key) => {
        const existing = logStreams.filter((es) => es.title == stream.title);
        if (existing.length) {
          return;
        }

        if (stream.title.toLowerCase().includes(key)) {
          logStreams.push(stream);
        }
      });
    });

    return logStreams;
  };
}
