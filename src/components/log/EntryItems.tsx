import EntryItem from './EntryItem';

interface EntryItemsProps {
  name: string;
	items: CollectionLogItem[];
	killCount: CollectionLogKillCount[];
}

const EntryItems = (props: EntryItemsProps) => {
  const { name, items, killCount } = props;

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
        <h3 className='text-xl font-bold text-orange'>{name}</h3>
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
        {items.length > 0 && items.map((item, i) => <EntryItem key={`${i}-${item.id}`} item={item}/>)}
      </div>
    </div>
  );
};

export default EntryItems;
