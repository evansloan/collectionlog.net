import { Item } from '../elements';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EntryItem from './EntryItem';

interface EntryItemsProps {
	items: CollectionLogItem[];
	killCount: CollectionLogKillCount[];
}

const EntryItems = (props: EntryItemsProps) => {
  const params = useParams();
  const { items, killCount } = props;
  const [activeEntry] = useState(params.entry ?? 'Abyssal Sire');

  const obtainedCount = items.filter((item) => item.obtained).length;
  const itemCount = items.length;

  let obtainedClass = 'text-yellow';
  if (obtainedCount == itemCount) {
    obtainedClass = 'text-green';
  } else if (!obtainedCount) {
    obtainedClass = 'text-red';
  }

  return (
    <div id='entry-items' className='flex md:flex flex-col w-full md:w-3/4'>
      <div className='mx-2 border-b border-b-lighter shadow-log'>
        <h3 className='text-xl font-bold text-orange'>{activeEntry}</h3>
        <p className='text-orange'>Obtained: <span className={obtainedClass}>{obtainedCount}/{itemCount}</span></p>
        {killCount.length > 0 && killCount.map((kc, i) => {
          return (
            <p key={`${i}-${kc.name}`} className='text-orange'>
              {kc.name}: <span className='text-white'>{kc.amount}</span>
            </p>
          );
        })}
      </div>
      <div className='flex flex-wrap grow content-start px-2 pt-3 mb-3 overflow-y-auto shadow-log'>
        {/* eslint-disable-next-line react/jsx-key */}
        {items.length > 0 && items.map((item, i) => <EntryItem item={item} number={i}/>)}
      </div>
    </div>
  );
};

export default EntryItems;