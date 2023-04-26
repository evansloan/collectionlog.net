import { AccountIcon, PageTitle } from '../elements';
import { AccountType, expectedMaxUniqueItems } from '../../app/constants';
import { PageHeader } from '../layout';
import { useAppSelector } from '../../app/hooks';

const Header = () => {
  const logState = useAppSelector((state) => state.log);
  const { collectionLog } = logState;

  /**
	 * Explicitly iterate through and count the unique items that have been obtained.
	 *
	 * This value can be compared to the total uniques collected. If the values do not match, it is an indicator that a sync is needed for some entries.
	 */
  const countObtainedUniques = (collectionLog: CollectionLog | undefined): number => {
    if (collectionLog === undefined) {
      return 0;
    }

    const uniqueItemIds = new Set<number>();
    for(const tabKey in collectionLog.tabs) {
      const tab = collectionLog.tabs[tabKey];

      for(const collectionLogEntryKey in tab) {
        const collectionLogEntry = tab[collectionLogEntryKey];

        for(const item of collectionLogEntry.items) {
          if (item.obtained && !uniqueItemIds.has(item.id)) {
            uniqueItemIds.add(item.id);
          }
        }
      }
    }
    return uniqueItemIds.size;
  };

  const explicitlyCountedUniques = countObtainedUniques(collectionLog);

  return (
    <PageHeader className='flex-col'>
      <div className='flex justify-center items-center'>
        <AccountIcon accountType={collectionLog?.accountType as AccountType} height='20px' />
        <PageTitle title={`${collectionLog?.username}'s Collection log`} />
      </div>
      <p className='text-lg font-bold text-center text-orange'>
				Obtained: <span className='text-white'>{collectionLog?.uniqueObtained}/{collectionLog?.uniqueItems}</span> {' '}
				Rank: <span className='text-white'>#{logState.rank}</span>
      </p>
      {collectionLog && collectionLog?.uniqueItems < expectedMaxUniqueItems &&
				<p className='text-lg font-bold text-center text-yellow'>
				New unique items have been added to Old School RuneScape! Please re-upload collection log data.
				</p>
      }
      {collectionLog && collectionLog?.uniqueObtained !== explicitlyCountedUniques &&
				<p className='text-lg font-bold text-center text-yellow'>
				Total obtained does not match specific items collected. Please re-upload collection log data.
				</p>
      }
    </PageHeader>
  );
};

export default Header;
