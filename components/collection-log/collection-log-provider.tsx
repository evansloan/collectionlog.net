import { sortCollectionLog } from '@/lib/collection-log-helpers';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export const CollectionLogContext = createContext<CollectionLog | undefined>(
  undefined
);

interface CollectionLogProviderProps {
  collectionLog: CollectionLog;
  children: ReactNode;
}

const CollectionLogProvider = ({
  collectionLog,
  children,
}: CollectionLogProviderProps) => {
  sortCollectionLog(collectionLog);
  const [collectionLogState] = useState(collectionLog);
  return (
    <CollectionLogContext.Provider value={collectionLogState}>
      {children}
    </CollectionLogContext.Provider>
  );
};

export const useCollectionlogContext = () => {
  const collectionLog = useContext(CollectionLogContext);
  if (!collectionLog) {
    throw new Error(
      'useCollectionLog must be used within CollectionLogProvider'
    );
  }

  return collectionLog;
};

export default CollectionLogProvider;
