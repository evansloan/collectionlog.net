import CollectionLogService, { OpenView } from '../../services/collection-log';
import { PageListPage } from './index';

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
        const isCompleted = collectionLog.isPageCompleted(pageName);
        const isOpen = pageName == openView.page;

        return <PageListPage
          key={pageName}
          index={i}
          isCompleted={isCompleted}
          isOpen={isOpen}
          pageClickHandler={pageClickHandler}
          pageName={pageName}
        />;
      })}
    </div>
  );
};

export default PageList;
