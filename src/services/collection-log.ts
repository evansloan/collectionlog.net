import { CollectionLogAPI } from '../api/collection-log/collection-log-api';

export interface ActivePage {
  tab: string;
  page: string;
}

export interface OpenPage {
  tab: string;
  name: string;
  page: CollectionLogEntry;
}

class CollectionLogService {
  private static readonly TABS = [
    'Bosses',
    'Raids',
    'Clues',
    'Minigames',
    'Other',
  ];

  private static readonly CLUE_TAB_ENTRIES = [
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
  ];

  private static DEFAULT_TAB_NAME = 'Bosses';
  private static DEFAULT_PAGE_NAME = 'Abyssal Sire';

  private static api = CollectionLogAPI.getInstance();

  public constructor(public data: CollectionLog) {
    this.sortTabs();
  }

  private sortTabs() {
    const temp: CollectionLogTab = {};
    for (const tabName of CollectionLogService.TABS) {
      temp[tabName] = this.data.tabs[tabName];
    }
    this.data.tabs = temp;
  }

  public static async getByUsername(username: string) {
    username = username.toLowerCase();
    const response = await this.api.getCollectionLog(username);
    const collectionLog = response.data.collectionLog;
    if (!collectionLog) {
      return null;
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

  public getPage(activePage: ActivePage) {
    const { tab, page } = activePage;
    return this.data.tabs[tab][page];
  }

  public getPageList(tabName: string) {
    return this.data.tabs[tabName];
  }

  public getActivePage(pageName: string): ActivePage {
    const tabs = this.getTabs();
    let tab = tabs?.find((tabName) => {
      const entry = this.data.tabs[tabName][pageName];
      return entry != undefined;
    });

    if (!tab) {
      tab = CollectionLogService.DEFAULT_TAB_NAME;
      pageName = CollectionLogService.DEFAULT_PAGE_NAME;
    }

    return {
      tab,
      page: pageName,
    };
  }

  public getPageItems(activePage: ActivePage) {
    return this.data.tabs[activePage.tab][activePage.page].items;
  }

  public isPageCompleted(pageName: string) {
    const items = this.getPageItems(this.getActivePage(pageName));
    const obtainedItems = items.filter((item) => {
      return item.obtained;
    }).length;
    return obtainedItems === items.length && items;
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