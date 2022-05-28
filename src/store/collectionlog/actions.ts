import { CollectionLogAPI } from 'src/api/CollectionLogAPI';
import { AppDispatch } from '../store';
import { setActiveEntry, setActiveTab, setData, setError } from './slice';


export const fetchCollectionLog = (username: string, entry?: string) => {
  return async(dispatch: AppDispatch, getState: any) => {
    if (entry) {
      dispatch(setActiveEntry(entry));
    }

    const api = new CollectionLogAPI();
    const res = await api.getCollectionLog(username);

    if (res.data.error) {
      dispatch(setError(res.data.error));
      return;
    }

    dispatch(setData(res.data.collection_log));
  }
}

export const updateActiveTab = (tabName: string, entryName: string) => {
  return async(dispatch: AppDispatch, getState: any) => {
    dispatch(setActiveTab(tabName));
    dispatch(setActiveEntry(entryName));
  }
}