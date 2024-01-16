import { CollectionLogAPI } from '@/lib/api/collection-log/collection-log-api';
import { sortAlphabetical, toTitleCase } from '@/lib/utils';

const TAB_BOSSES = 'Bosses';
const TAB_RAIDS = 'Raids';
const TAB_CLUES = 'Clues';
const TAB_MINIGAMES = 'Minigames';
const TAB_OTHER = 'Other';
const TABS = [TAB_BOSSES, TAB_RAIDS, TAB_CLUES, TAB_MINIGAMES, TAB_OTHER];

const CUSTOM_PAGE_SORT: { [key: string]: string[] } = {
  [TAB_CLUES]: [
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

/**
 * Sorts the pages in the collection log and updates the collection log tabs accordingly.
 *
 * @param {CollectionLog} collectionLog - The original collection log object.
 * @returns {void}
 */
export const sortCollectionLog = (collectionLog: CollectionLog): void => {
  const sorted: CollectionLogTab = {};
  TABS.forEach((tabName) => {
    sorted[tabName] = {};
    const pageNameSort =
      CUSTOM_PAGE_SORT[tabName] ??
      sortAlphabetical(Object.keys(collectionLog.tabs[tabName]));

    pageNameSort.forEach((pageName) => {
      sorted[tabName][pageName] = collectionLog.tabs[tabName][pageName];
    });
  });

  collectionLog.tabs = sorted;
};

/**
 * Formats the account type or rank type into a human-readable format.
 *
 * @param {AccountType|RankType} accountType - The account type or rank type to be formatted.
 * @returns {string} - The formatted account type or rank type.
 */
export const formatAccountType = (
  accountType: AccountType | RankType
): string => {
  return toTitleCase(accountType.replace(/_/g, ' '));
};

export interface CollectionLogFull {
  collectionLog: CollectionLog;
  ranks: Ranks;
  settings: UserSettings;
}

/**
 * Retrieves the full collection log for a given username.
 *
 * @param {string} username - The username of the user to retrieve the collection log for.
 * @returns {Promise<CollectionLogFull>} - Object containing the collection log, ranks, and settings.
 */
export const getFullCollectionLog = async (
  username: string
): Promise<CollectionLogFull> => ({
  collectionLog: await CollectionLogAPI.getCollectionLog(username),
  ranks: await CollectionLogAPI.getRanksByUsername(username),
  settings: await CollectionLogAPI.getUserSettings(username),
});
