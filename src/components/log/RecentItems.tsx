import { PageHeader } from '../layout';
import { Item, PageTitle } from '../elements';
import { formatDate } from '../../utils';
import { useAppSelector } from '../../app/hooks';

const RecentItems = () => {
  const logState = useAppSelector((state) => state.log);
  const recentItems = logState.recentItems;

  return (
    <div>
      <PageHeader className='border-black border-t-4'>
        <PageTitle title='Recent items' />
      </PageHeader>
      <div className='flex sm:flex-wrap flex-col sm:flex-row justify-center sm:justify-around grow p-2 mt-[10px]'>
        {recentItems && recentItems.map((item, i) => {
          return (
            <div key={`${i}-${item.id}`} className='flex flex-wrap justify-center grow'>
              <Item item={item} showQuantity={false} isDetail={true}/>
              <div className='flex flex-col'>
                <p>{item.name}</p>
                <p>{formatDate(item.obtainedAt as string)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentItems;
