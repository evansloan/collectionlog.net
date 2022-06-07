import axios, { AxiosInstance } from 'axios';

class CollectionLogAPI {
  private static readonly BASE_URL = 'https://api.collectionlog.net';
  private static readonly COLLECTION_LOG_ENDPOINT = 'collectionlog';
  private static readonly HISCORES_ENDPOINT = 'hiscores';
  private static readonly ITEMS_ENDPOINT = 'items';

  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: CollectionLogAPI.BASE_URL,
    });
  }

  private getRequest = async (url: string, queryParams?: any) => {
    try {
      return await this.instance.get(url, { params: queryParams });
    } catch (error: any) {
      return error.response;
    }
  };

  getCollectionLog = async (username: string) => {
    const url = `${CollectionLogAPI.COLLECTION_LOG_ENDPOINT}/user/${username}`;
    return await this.getRequest(url);
  };

  getRecentItems = async (username: string) => {
    const url = `${CollectionLogAPI.ITEMS_ENDPOINT}/recent/${username}`;
    return await this.getRequest(url);
  };

  getHiscores = async (type: string, page: number, filter: string) => {
    const url = `${CollectionLogAPI.HISCORES_ENDPOINT}/${type}/${page}`;
    let queryParams = undefined;
    if (filter != 'ALL') {
      queryParams = { accountType: filter };
    }
    return await this.getRequest(url, queryParams);
  };
}

export { CollectionLogAPI };
