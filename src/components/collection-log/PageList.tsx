import CollectionLogService, { OpenView } from '../../services/collection-log';

interface PageListProps {
  collectionLog: CollectionLogService;
  openView: OpenView;
  pageClickHandler: (pageName: string) => void;
  pageNames: string[];
}

const PageList = (props: PageListProps) => {
  const {
    collectionLog,
    openView,
    pageClickHandler,
    pageNames,
  } = props;

  return (
    <div id='entry-list' className='pb-5 w-full md:w-1/4 h-full border-black border-r shadow-log overflow-y-scroll hidden md:block'>
      {pageNames.map((pageName, i) => {
        const isComplete = collectionLog.isPageCompleted(pageName);
        const textColor = isComplete ? 'text-green' : 'text-orange';

        let bg = i % 2 == 0 ? 'bg-primary' : 'bg-light';
        bg = pageName == openView.page ? 'bg-highlight' : bg;

        return (
          <p
            className={`${bg} hover:bg-highlight ${textColor} text-lg cursor-pointer`}
            onClick={() => pageClickHandler(pageName)}
            key={pageName}>
            {pageName}
          </p>
        );
      })}
    </div>
  );
};

export default PageList;
