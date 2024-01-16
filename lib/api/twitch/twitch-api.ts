export default class TwitchAPI {
  private static readonly AUTH_URL = 'https://id.twitch.tv/oauth2/token';
  private static readonly BASE_URL = 'https://api.twitch.tv/helix';

  private static readonly GAME_ID = '459931';

  private static readonly CLIENT_ID = process.env.TWITCH_CLIENT_ID as string;
  private static readonly CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET as string;
  private static readonly GRANT_TYPE = 'client_credentials';

  private static readonly SEARCH_KEYS = ['clog', 'collection log', '!log'];

  private static instance: TwitchAPI;

  private accessToken: string | undefined = undefined;

  private constructor() {}

  public static getInstance() {
    if (!TwitchAPI.instance) {
      TwitchAPI.instance = new TwitchAPI();
    }
    return TwitchAPI.instance;
  }

  public getAuth = async (): Promise<string> => {
    const params = {
      client_id: TwitchAPI.CLIENT_ID,
      client_secret: TwitchAPI.CLIENT_SECRET,
      grant_type: TwitchAPI.GRANT_TYPE,
    };

    const response = await fetch(`${TwitchAPI.AUTH_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const authData = (await response.json()) as AuthResponse;
    return authData.access_token;
  };

  public getStreams = async () => {
    if (!this.accessToken) {
      this.accessToken = await this.getAuth();
    }

    const url = 'streams';
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Client-Id': TwitchAPI.CLIENT_ID,
    };
    const params = new URLSearchParams({
      game_id: TwitchAPI.GAME_ID,
      type: 'live',
    });

    let response = await fetch(`${TwitchAPI.BASE_URL}/${url}?${params}`, {
      headers,
    });
    let streamData = (await response.json()) as StreamsResponse;
    const streams = streamData.data ?? [];

    while (streamData.pagination && streamData.pagination.cursor) {
      params.set('after', streamData.pagination.cursor);
      response = await fetch(`${TwitchAPI.BASE_URL}/${url}?${params}`, {
        headers,
      });
      streamData = (await response.json()) as StreamsResponse;
      streams.push(...streamData.data);
    }

    return streams.filter((stream) =>
      TwitchAPI.SEARCH_KEYS.some((key) =>
        stream.title.toLowerCase().includes(key)
      )
    );
  };
}
