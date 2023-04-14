import { updateUrl } from '../../utils';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

interface EntryListProps {
  entries: string[];
  collectionLog: CollectionLog | undefined;
  tabName: string;
  activeEntryState: [string, Dispatch<SetStateAction<string>>];
}

const EntryList = (props: EntryListProps) => {
  const params = useParams();
  const {
    entries,
    collectionLog,
    tabName,
  } = props;

  const [activeEntry, setActiveEntry] = props.activeEntryState;

  const onEntryClick = (entryName: string) => {
    setActiveEntry(entryName);
    showEntries();
    updateUrl(`/log/${params.username}/${entryName}`);
  };

  const showEntries = () => {
    const entryList = document.getElementById('entry-list');
    const entryItems = document.getElementById('entry-items');

    const isHidden = entryList?.classList.contains('hidden');

    if (isHidden) {
      entryList?.classList.remove('hidden');
      entryList?.classList.add('block');

      entryItems?.classList.add('hidden');
      entryItems?.classList.remove('flex');
    } else {
      entryList?.classList.add('hidden');
      entryList?.classList.remove('block');

      entryItems?.classList.add('flex');
      entryItems?.classList.remove('hidden');
    }
  };

  return (
    <div id='entry-list' className='pb-5 w-full md:w-1/4 h-full border-black border-r shadow-log overflow-y-scroll hidden md:block'>
      {entries.map((entryName, i) => {
        const entryItems = collectionLog?.tabs[tabName][entryName]?.items;
        const entryObtained = entryItems?.filter((item) => {
          return item.obtained;
        }).length;
        const isComplete = entryObtained == entryItems?.length && entryItems;
        const textColor = isComplete ? 'text-green' : 'text-orange';

        let bg = i % 2 == 0 ? 'bg-primary' : 'bg-light';
        bg = entryName == activeEntry ? 'bg-highlight' : bg;

        return (
          <p
            className={`${bg} hover:bg-highlight ${textColor} text-lg cursor-pointer`}
            onClick={() => onEntryClick(entryName)}
            key={entryName}>
            {entryName}
          </p>
        );
      })}
    </div>
  );
};

export default EntryList;