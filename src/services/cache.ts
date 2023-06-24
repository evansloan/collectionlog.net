class CacheService {
  public static readonly DEFAULT_TTL = 60;

  private static instance: CacheService;

  public static getInstance() {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public add<T>(key: string, data: T, ttlOverride?: number) {
    if (!key || !data) {
      return;
    }

    const ttl = ttlOverride ?? CacheService.DEFAULT_TTL;
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + ttl);

    const cacheItem = {
      data,
      expires: expires.toISOString(),
    } as CacheItem<T>;
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  public get<T>(key: string): T|null {
    const lsItem = localStorage.getItem(key);
    if (!lsItem) {
      return null;
    }

    const now = new Date();
    const cacheItem = JSON.parse(lsItem) as CacheItem<T>;
    if (now > new Date(cacheItem.expires)) {
      this.remove(key);
      return null;
    }

    return cacheItem.data;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default CacheService;
