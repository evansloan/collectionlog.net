import { CollectionLogAPI } from 'src/api/CollectionLogAPI';
import { AppDispatch } from '../store';
import { setActiveEntry, setActiveTab, setData, setError } from './slice';


export const fetchCollectionLog = (username: string, tab?: string, entry?: string) => {
  return async(dispatch: AppDispatch, getState: any) => {
    const api = new CollectionLogAPI();
    const res = await api.getCollectionLog(username);

    if (res.data.error) {
      dispatch(setError(res.data.error));
    }

    if (tab) {
      dispatch(setActiveTab(tab));
    }

    if (entry) {
      dispatch(setActiveEntry(entry));
    }

    dispatch(setData(res.data));
  }
}