import { CollectionLogAPI } from '../api/collection-log/collection-log-api';
import { sortAlphabetical } from '../utils';

/**
 * Represents the current open tab/page combination
 */
export interface OpenView {
  tab: string;
  page: string;
}

class CollectionLogService {

  private static readonly TAB_BOSSES = 'Bosses';
  private static readonly TAB_RAIDS = 'Raids';
  private static readonly TAB_CLUES = 'Clues';
  private static readonly TAB_MINIGAMES = 'Minigames';
  private static readonly TAB_OTHER = 'Other';

  private static readonly TABS = [
    this.TAB_BOSSES,
    this.TAB_RAIDS,
    this.TAB_CLUES,
    this.TAB_MINIGAMES,
    this.TAB_OTHER,
  ];

  private static CUSTOM_PAGE_SORT: { [key: string]: string[] } = {
    [this.TAB_CLUES]: [
      'Beginner Treasure Trails',
      'Easy Treasure Trails',
      'Medium Treasure Trails',
      'Hard Treasure Trails',
      'Elite Treasure Trails',
      'Master Treasure Trails',
      'Hard Treasure Trails (Rare)',
      'Elite Treasure Trails (Rare)',
      'Master Treasure Trails (Rare)',
      'Shared Treasure Trail Rewards',
    ],
  };

  private static DEFAULT_TAB_NAME = 'Bosses';
  private static DEFAULT_PAGE_NAME = 'Abyssal Sire';

  private static api = CollectionLogAPI.getInstance();

  public constructor(public data: CollectionLog) {
    this.sortData();
  }

  private sortData() {
    const temp: CollectionLogTab = {};
    for (const tabName of CollectionLogService.TABS) {
      temp[tabName] = {};

      const pageNameSort = CollectionLogService.CUSTOM_PAGE_SORT[tabName] ??
        sortAlphabetical(Object.keys(this.data.tabs[tabName]));

      for (const pageName of pageNameSort) {
        temp[tabName][pageName] = this.data.tabs[tabName][pageName];
      }
    }

    this.data.tabs = temp;
  }

  public static async getByUsername(username: string) {
    username = username.toLowerCase();
    const response = await this.api.getCollectionLog(username);
    const collectionLog = response.data.collectionLog;
    if (!collectionLog) {
      return undefined;
    }

    return new this(collectionLog);
  }

  public getTabs(): string[] {
    return Object.keys(this.data.tabs);
  }

  public getUsername() {
    return this.data.username;
  }

  public getAccountType() {
    return this.data.accountType;
  }

  public getUniqueObtained() {
    return this.data.uniqueObtained;
  }

  public getUniqueItems() {
    return this.data.uniqueItems;
  }

  public getPage(openView: OpenView) {
    const { tab, page } = openView;
    return this.data.tabs[tab][page];
  }

  public getPages(tabName: string) {
    return this.data.tabs[tabName];
  }

  public getTabFromPage(pageName: string): string | undefined {
    const tabs = this.getTabs();
    return tabs?.find((tabName) => {
      const page = this.data.tabs[tabName][pageName];
      return page != undefined;
    });
  }

  public getPageItems(openView: OpenView) {
    const { tab, page } = openView;
    return this.data.tabs[tab][page].items;
  }

  public isPageCompleted(page: string): boolean {
    const tab = this.getTabFromPage(page);
    if (!tab) {
      return false;
    }

    const items = this.getPageItems({
      tab,
      page,
    });

    const obtainedItems = items.filter((item) => {
      return item.obtained;
    }).length;

    return obtainedItems === items.length;
  }

  /**
   * Explicitly iterate through and count the unique items that have been obtained.
   *
   * This value can be compared to the total uniques collected. If the values do not match, it is an indicator that a sync is needed for some entries.
   */
  public countObtainedUniques() {
    const itemIds = this.getTabs().flatMap((tabName) => {
      const pages = this.data.tabs[tabName];
      return Object.keys(pages).flatMap((pageName) => {
        const page = pages[pageName];
        return page.items.filter((item) => item.obtained)
          .map((item) => item.id);
      });
    });

    return new Set(itemIds).size;
  }
}

export default CollectionLogService;