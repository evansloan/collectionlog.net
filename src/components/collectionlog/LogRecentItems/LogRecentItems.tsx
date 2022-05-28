import { LogItem } from '@components/collectionlog';
import { RecentItemData } from '@models/CollectionLog';
import { formatDate } from '@utils/format';

import './LogRecentItems.scss';

interface LogRecentItemsProps {
  items?: RecentItemData[];
}

const LogRecentItems = (props: LogRecentItemsProps) => (
  <div className='recent-items-container p-[10px] border-4 border-black border-t-0'>
    <h2 className='text-center'>Recent Obtained Items</h2>
    <div className='recent-items flex flex-wrap justify-around mt-[20px]'>
      {props.items?.map((item, i) => {
        return (
          <div className='flex' key={`${item.itemId}${i}`}>
            <LogItem item={item} />
            <div className='text-[18px] text-white'>
              <p>{item.name}</p>
              <p>{formatDate(item.obtainedAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default LogRecentItems;
