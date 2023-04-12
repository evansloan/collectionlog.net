type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type HTMLElementProps<T> = Omit<React.HTMLProps<HTMLElement>, keyof T> & T;
type DetailedHTMLElementProps<T, K> = Omit<React.DetailedHTMLProps<T<K>>, keyof K>;

interface CollectionLogKillCount {
  name: string;
  amount: number;
}

interface CollectionLogItem {
  id: number;
  name: string;
  quantity: number;
  obtained: boolean;
  sequence: number;
  obtainedAt?: string;
  username?: string;
}

interface CollectionLogEntry {
  [entryName: string]: {
    items: CollectionLogItem[];
    killCount: CollectionLogKillCount[] | undefined;
  };
}

interface CollectionLogTab {
  [tabName: string]: CollectionLogEntry;
}

interface CollectionLog {
  tabs: CollectionLogTab;
  username: string;
  accountType: AccountType;
  totalObtained: number;
  totalitems: number;
  uniqueObtained: number;
  uniqueItems: number;
}

interface RecentItems {
  username: string;
  accountType: string;
  items: CollectionLogItem[];
}

interface User {
  id: string;
  username: string;
  accountType: AccountType;
  isBanned: boolean;
  collectionLog?: CollectionLog;
}

interface Hiscores {
  rank: number;
  username: string;
  accountType: AccountType;
  obtained: number;
  total: number;
  recentObtained: number;
}

type RankType = 'ALL'
  | 'NORMAL'
  | 'IRONMAN'
  | 'HARDCORE_IRONMAN'
  | 'ULTIMATE_IRONMAN'
  | 'GROUP_IRONMAN'
  | 'HARDCORE_GROUP_IRONMAN';

type Ranks = {
  [key in RankType]: number;
};

interface UserSettings {
  displayRank: RankType;
  showQuantity: boolean;
}

interface CacheItem<T> {
  data: T;
  expires: string;
}
