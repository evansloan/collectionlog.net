import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
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

  private static apiInstance: CollectionLogAPI;
  private static axiosInstance: AxiosInstance;

  private constructor() {
    CollectionLogAPI.axiosInstance = axios.create({
      baseURL: CollectionLogAPI.BASE_URL,
    });
  }

  public static getInstance() {
    if (!CollectionLogAPI.apiInstance) {
      CollectionLogAPI.apiInstance = new CollectionLogAPI();
    }
    return CollectionLogAPI.apiInstance;
  }

  private getRequest = async <T>(url: string, queryParams?: any): Promise<AxiosResponse<T>> => {
    return await CollectionLogAPI.axiosInstance.get<T>(url, { params: queryParams });
  };

  private postRequest = async <T, R>(url: string, data: T): Promise<AxiosResponse<R>> => {
    try {
      return await CollectionLogAPI.axiosInstance.post<any, AxiosResponse<R>, T>(url, data);
    } catch (error: any) {
      return error.response;
    }
  };

  getCollectionLog = async (username: string) => {
    const url = `${CollectionLogAPI.COLLECTION_LOG_ENDPOINT}/user/${username}`;
    const res = await this.getRequest<CollectionLogResponse>(url);
    return res.data.collectionLog;
  };

  getRecentItems = async (username: string) => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/recent/${username}`;
    const res = await this.getRequest<ItemsResponse>(url);
    return res.data.items;
  };

  getRecentItemsGlobal = async () => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/global`;
    const res = await this.getRequest<ItemsResponse>(url);
    return res.data.items;
  };

  getHiscores = async (page: number, filter: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/${page}`;
    let queryParams = undefined;
    if (filter != 'ALL') {
      queryParams = { accountType: filter };
    }
    const res = await this.getRequest<HiscoresResponse>(url, queryParams);
    return res.data.hiscores;
  };

  getRankByUsername = async (username: string, filter?: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/rank/${username}`;
    let queryParams = undefined;
    if (filter != 'ALL') {
      queryParams = { accountType: filter };
    }
    const res = await this.getRequest<RankResponse>(url, queryParams);
    return res.data.rank;
  };

  getRanksByUsername = async (username: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/ranks/${username}`;
    const res = await this.getRequest<RanksResponse>(url);
    return res.data.accountTypeRanks;
  };

  getUserTypeahead = async (username: string) => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/typeahead/${username.toLowerCase()}`;
    return await this.getRequest<UserListResponse>(url);
  };

  getUserByUsername = async (username: string) => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/username/${username.toLowerCase()}`;
    return await this.getRequest<UserResponse>(url);
  };

  getUserCount = async () => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/count`;
    return await this.getRequest<UserCountResponse>(url);
  };

  getUserSettings = async (username: string) => {
    const url = `${CollectionLogAPI.USER_ENDPOINT}/settings/${username.toLowerCase()}`;
    const res = await this.getRequest<UserSettingsResponse>(url);
    return res.data.userSettings;
  };
}

export { CollectionLogAPI };
