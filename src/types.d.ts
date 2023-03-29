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
  uniqueObtained: number; // The total uniques obtained as defined by the overview number
  uniqueItems: number;
  uniqueObtainedByItemCount: number; // The total uniques obtained as defined by the sum of known obtained. If value doesn't match uniqueObtained, this is indicative of item data being out of sync.
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
