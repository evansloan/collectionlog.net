import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import type { RootState, AppDispatch } from './store';
import CollectionLogService from '../services/collection-log';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useOutsideClickHandler = (ref: React.RefObject<Element>, clickHandler: (...args: any) => void) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (ref.current && !ref.current.contains(target)) {
        clickHandler();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref]);
};

export const useCollectionLog = (username: string) => {
  const [collectionLogService, setCollectionLogService] = useState<CollectionLogService>();
  const query = useQuery({
    queryKey: [`collectionLog-${username}`],
    queryFn: async () => {
      if (!username) {
        return;
      }
      return await CollectionLogService.getByUsername(username);
    },
  });

  useEffect(() => {
    if (!query.data) {
      return;
    }
    setCollectionLogService(new CollectionLogService(query.data));
  }, [query.data]);

  return { collectionLog: collectionLogService, ...query };
};
