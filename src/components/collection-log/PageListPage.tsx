interface PageListPageProps {
  index: number;
  isCompleted: boolean;
  isOpen: boolean;
  pageClickHandler: (pageName: string) => void;
  pageName: string;
}

const PageListPage = (props: PageListPageProps) => {
  const {
    index,
    isCompleted,
    isOpen,
    pageClickHandler,
    pageName,
  } = props;

  const textColor = isCompleted ? 'text-green' : 'text-orange';
  let bg = index % 2 == 0 ? 'bg-primary' : 'bg-light';
  bg = isOpen ? 'bg-highlight' : bg;

  return (
    <p
      className={`${bg} hover:bg-highlight ${textColor} text-lg cursor-pointer`}
      onClick={() => pageClickHandler(pageName)}
    >
      {pageName}
    </p>
  );
};

export default PageListPage;