export interface CollectionLogKillCountData {
  name: string;
  amount: number;
}

export interface CollectionLogItemData {
  id: number;
  name: string;
  quantity: number;
  obtained: boolean;
  sequence: number;
  obtainedAt?: string;
};

export interface CollectionLogEntryData {
  [entryName: string]: {
    items: CollectionLogItemData[],
    kill_count: CollectionLogKillCountData[] | undefined,
  }
};

export interface CollectionLogTabData {
  [tabName: string]: CollectionLogEntryData
};

export interface CollectionLogData {
  tabs: CollectionLogTabData;
  username: string;
  account_type: string;
  total_obtained: number;
  total_items: number;
  unique_obtained: number;
  unique_items: number;
};

// TODO: fix recent items endpoint in api to return
// result inline with collection log endpoint so 
// CollectionLogItemData is reusable here
export interface RecentItemData {
  itemId: number;
  name: string;
  quantity: number;
  obtained: boolean;
  obtainedAt: string;
}

export interface RecentItemsData {
  username: string;
  account_type: string;
  items: RecentItemData[];
}

