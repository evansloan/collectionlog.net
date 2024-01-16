import { revalidate } from '@/app/actions';

import {
  BaseResponse,
  CollectionLogResponse,
  HiscoresResponse,
  ItemsResponse,
  RankResponse,
  RanksResponse,
  UserCountResponse,
  UserListResponse,
  UserResponse,
  UserSettingsResponse,
} from './responses';

class CollectionLogAPI {
  private static readonly BASE_URL = 'https://api.collectionlog.net';
  private static readonly COLLECTION_LOG_ENDPOINT = 'collectionlog';
  private static readonly HISCORES_ENDPOINT = 'hiscores';
  private static readonly ITEMS_ENDPOINT = 'items';
  private static readonly USER_ENDPOINT = 'user';

  private static readonly CACHE_REVALIDATE_SECONDS = 60;

  private static request = async <T>(
    path: string,
    params?: {
      [key: string]: any;
    },
    init?: RequestInit,
    forceRevalidate?: boolean
  ): Promise<T> => {
    const config: RequestInit = {
      method: 'GET',
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      next: {
        revalidate: this.CACHE_REVALIDATE_SECONDS,
        ...init?.next,
      },
    };

    if (forceRevalidate && config.next?.tags?.length) {
      config.next.tags.forEach((tag) => revalidate(tag));
    }

    let url = `${this.BASE_URL}/${path}`;

    if (params) {
      const queryParams = new URLSearchParams(params);
      url += `?${queryParams.toString()}`;
    }

    const response = await fetch(url, config);
    if (!response.ok) {
      const error = (await response.json()) as BaseResponse;
      throw new Error(`${response.status}: ${error.error}`, {
        cause: response.url,
      });
    }

    return await response.json();
  };

  /**
   * Retrieves the collection log for a specified user.
   *
   * @param {string} username - The username of the user whose collection log will be retrieved.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<CollectionLog>} - A Promise that resolves to the collection log entries for the specified user.
   */
  static getCollectionLog = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<CollectionLog> => {
    const url = `${this.COLLECTION_LOG_ENDPOINT}/user/${username}`;
    const requestConfig = {
      next: {
        tags: [`collection-log-${username.toLowerCase()}`],
      },
    };
    const response = await this.request<CollectionLogResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.collectionLog;
  };

  /**
   * Retrieves the recent items for a given user.
   *
   * @param {string} username - The username of the user whose recent items are to be retrieved.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<CollectionLogItem[]>} - A promise that resolves to an array of recent items.
   */
  static getRecentItems = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<CollectionLogItem[]> => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/recent/${username}`;
    const requestConfig = {
      next: {
        tags: [`collection-log-recent-items-${username.toLowerCase()}`],
      },
    };
    const response = await this.request<ItemsResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.items;
  };

  /**
   * Retrieves the recent global items from the CollectionLog API.
   *
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<CollectionLogItem[]>} - A promise that resolves with an array of items.
   */
  static getRecentItemsGlobal = async (
    forceRevalidate?: boolean
  ): Promise<CollectionLogItem[]> => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/global`;
    const requestConfig = {
      next: {
        tags: ['global-recent-items'],
      },
    };
    const response = await this.request<ItemsResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.items;
  };

  /**
   * Retrieves the hiscores for a given page and filter.
   *
   * @param {number} page - The page number of the hiscores.
   * @param {RankType} rankType - The rank type to retrieve.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<Hiscores[]>} - The hiscores data for the given page and filter.
   */
  static getHiscores = async (
    page: number,
    rankType: RankType,
    forceRevalidate?: boolean
  ): Promise<Hiscores[]> => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/${page}`;
    const requestConfig = {
      next: {
        tags: ['hiscores'],
      },
    };

    let queryParams = undefined;
    if (rankType != 'ALL') {
      queryParams = { accountType: rankType };
    }

    const response = await this.request<HiscoresResponse>(
      url,
      queryParams,
      requestConfig,
      forceRevalidate
    );

    return response.hiscores;
  };

  /**
   * Retrieves the rank of a user by their username.
   *
   * @param {string} username - The username of the user.
   * @param {RankType} rankType - The rank type to retrieve.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<number>} - The rank of the user.
   */
  static getRankByUsername = async (
    username: string,
    rankType?: RankType,
    forceRevalidate?: boolean
  ): Promise<number> => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/rank/${username}`;
    const requestConfig = {
      next: {
        tags: ['ranks'],
      },
    };

    let queryParams = undefined;
    if (rankType != 'ALL') {
      queryParams = { accountType: rankType };
    }

    const response = await this.request<RankResponse>(
      url,
      queryParams,
      requestConfig,
      forceRevalidate
    );

    return response.rank;
  };

  /**
   * Retrieves the ranks of a specified user by username.
   *
   * @param {string} username - The username of the user to retrieve ranks for.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<Ranks>} - A promise that resolves with an array of ranks for the account types.
   */
  static getRanksByUsername = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<Ranks> => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/ranks/${username}`;
    const requestConfig = {
      next: {
        tags: [`ranks-${username}`],
      },
    };
    const response = await this.request<RanksResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.accountTypeRanks;
  };

  /**
   * Retrieves a list of users matching the provided username.
   *
   * @param {string} username - The username to search for.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<User[]>} - A promise that resolves to an array of user objects.
   */
  static getUserTypeahead = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<User[]> => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/typeahead/${username.toLowerCase()}`;
    const requestConfig = {
      next: {
        tags: [`user-typeahead-${username}`],
        revalidate: 30,
      },
    };
    const response = await this.request<UserListResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.users;
  };

  /**
   * Retrieves user information based on a given username.
   *
   * @param {string} username - The username of the user to retrieve information for.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<User>} A promise that resolves to the user information.
   */
  static getUserByUsername = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<User> => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/username/${username.toLowerCase()}`;
    const requestConfig = {
      next: {
        tags: ['user'],
      },
    };
    const response = await this.request<UserResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );

    return response.user;
  };

  /**
   * Retrieves the count of users.
   *
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<number>} - The count of users.
   */
  static getUserCount = async (forceRevalidate?: boolean): Promise<number> => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/count`;
    const requestConfig = {
      next: {
        tags: ['home-user-count'],
      },
    };
    const response = await this.request<UserCountResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.count;
  };

  /**
   * Retrieves the user settings for a given username.
   *
   * @param {string} username - The username of the user to retrieve the settings for.
   * @param {boolean} forceRevalidate - Specifies whether to force a revalidation of the cache.
   * @returns {Promise<UserSettings>} - A promise that resolves to the user settings.
   */
  static getUserSettings = async (
    username: string,
    forceRevalidate?: boolean
  ): Promise<UserSettings> => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/settings/${username.toLowerCase()}`;
    const requestConfig = {
      next: {
        tags: [`user-settings-${username}`],
      },
    };
    const response = await this.request<UserSettingsResponse>(
      url,
      undefined,
      requestConfig,
      forceRevalidate
    );
    return response.userSettings;
  };
}

export { CollectionLogAPI };
