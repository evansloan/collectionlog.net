import { CollectionLogData } from 'src/models/CollectionLog';
import entryList from '../data/entries.json';

const getMissingEntries = (data?: CollectionLogData) => {
  if (!data) {
    return null;
  }
  
  const loadedEntries = Object.keys(data.tabs).map((tabName, _i) => {
    return Object.keys(data.tabs[tabName]).map((entryName, _i) => {
      return entryName;
    });
  }).flat();

  let diff = entryList.filter((leftValue) => {
    return !loadedEntries.some((rightValue) => {
      return leftValue == rightValue;
    });
  });

  if (diff.length == 0) {
    return null;
  }

  if (diff.length > 3) {
    diff = diff.slice(0, 3);
    diff.push('and more...')
  }

  return `Missing collection log entries:\n${diff.join(', ')}`
}

export { getMissingEntries };