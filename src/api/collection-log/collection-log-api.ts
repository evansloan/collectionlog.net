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
    try {
      return await CollectionLogAPI.axiosInstance.get<T>(url, { params: queryParams });
    } catch (error: any) {
      return error.response;
    }
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
    return await this.getRequest<CollectionLogResponse>(url);
  };

  getRecentItems = async (username: string) => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/recent/${username}`;
    return await this.getRequest<ItemsResponse>(url);
  };

  getRecentItemsGlobal = async () => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/global`;
    return await this.getRequest<ItemsResponse>(url);
  };

  getHiscores = async (page: number, filter: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/${page}`;
    let queryParams = undefined;
    if (filter != 'ALL') {
      queryParams = { accountType: filter };
    }
    return await this.getRequest<HiscoresResponse>(url, queryParams);
  };

  getRankByUsername = async (username: string, filter?: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/rank/${username}`;
    let queryParams = undefined;
    if (filter != 'ALL') {
      queryParams = { accountType: filter };
    }
    return await this.getRequest<RankResponse>(url, queryParams);
  };

  getRanksByUsername = async (username: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/ranks/${username}`;
    return await this.getRequest<RanksResponse>(url);
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
    return await this.getRequest<UserSettingsResponse>(url);
  };
}

export { CollectionLogAPI };
