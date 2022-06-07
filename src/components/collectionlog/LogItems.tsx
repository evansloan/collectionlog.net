import { LogItem } from '@components/collectionlog';
import { FlexSection } from '@components/ui';

import { useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';

import { CollectionLogItemData } from '@models/CollectionLog';

const LogItems = () => {
  const state = useAppSelector((state: RootState) => state.collectionLog);

  const activeTab = state.activeTab as string;
  const activeEntry = state.activeEntry as string;
  const entry = state.data?.tabs[activeTab][activeEntry];
  const items = entry?.items as CollectionLogItemData[];
  const killCounts = entry?.kill_count;

  const showEntries = () => {
    const logList = document.getElementById('log-list-container');
    const logItems = document.getElementById('log-items-container');
    logList?.classList.remove('hidden');
    logItems?.classList.add('hidden');
  };

  const obtained = (items).filter((item) => {
    return item.obtained;
  }).length;
  const total = items.length;

  let obtainedClass = 'text-yellow';
  if (obtained == total) {
    obtainedClass = 'text-green';
  } else if (!obtained) {
    obtainedClass = 'text-red';
  }

  return (
    <FlexSection
      id='log-items-container'
      direction='flex-col'
      height='h-[550px]'
      width='w-full'
      padding='pb-[10px]'
      borderStyle=''
    >
      <button id='log-list-button' className='log-button mt-[10px] md:hidden' type='button' onClick={showEntries}>Show Entries</button>
      <div className='log-entry-info mx-2 border-b border-b-lighter'>
        <h3 className='text-left'>{activeEntry}</h3>
        <p className='m-0 text-orange'>Obtained: <span className={obtainedClass}>{obtained}/{total}</span></p>
        {killCounts?.map((kc, i) => {
          return <p key={`${i}-${kc.name}`} className='m-0 text-orange'>{`${kc.name}`}: <span className='text-white'>{kc.amount}</span></p>;
        })}
      </div>
      <div className='flex flex-row flex-wrap grow content-start max-w-full overflow-y-auto px-2'>
        {items.map((item, i) => {
          return <LogItem key={`${i}-${item.id}`} item={item} />;
        })}
      </div>
    </FlexSection>
  );
};

export default LogItems;
