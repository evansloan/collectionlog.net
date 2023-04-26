import { updateUrl } from '../../utils';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

interface PageListProps {
  entries: string[];
  collectionLog: CollectionLog | undefined;
  tabName: string;
  activeEntryState: [string, Dispatch<SetStateAction<string>>];
}

const PageList = (props: PageListProps) => {
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
    const pageList = document.getElementById('page-list');
    const items = document.getElementById('items');

    const isHidden = pageList?.classList.contains('hidden');

    if (isHidden) {
      pageList?.classList.remove('hidden');
      pageList?.classList.add('block');

      items?.classList.add('hidden');
      items?.classList.remove('flex');
    } else {
      pageList?.classList.add('hidden');
      pageList?.classList.remove('block');

      items?.classList.add('flex');
      items?.classList.remove('hidden');
    }
  };

  return (
    <div id='page-list' className='pb-5 w-full md:w-1/4 h-full border-black border-r shadow-log overflow-y-scroll hidden md:block'>
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

export default PageList;
