type AccountType =
  | 'NORMAL'
  | 'IRONMAN'
  | 'HARDCORE_IRONMAN'
  | 'ULTIMATE_IRONMAN'
  | 'GROUP_IRONMAN'
  | 'HARDCORE_GROUP_IRONMAN'
  | 'UNRANKED_GROUP_IRONMAN';

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

interface CollectionLogPage {
  [pageName: string]: {
    items: CollectionLogItem[];
    killCount: CollectionLogKillCount[] | undefined;
  };
}

interface CollectionLogTab {
  [tabName: string]: CollectionLogPage;
}

interface CollectionLog {
  tabs: CollectionLogTab;
  username: string;
  accountType: AccountType;
  totalObtained: number;
  totalItems: number;
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

type RankType = AccountType | 'ALL';

type Ranks = {
  [key in RankType]: number;
};

interface UserSettings {
  displayRank: RankType;
  showQuantity: boolean;
}
