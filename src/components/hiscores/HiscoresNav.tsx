import { ActiveElement } from '@components/ui';

const HISCORES_FILTERS = [
  'all',
  'ironman',
  'hardcore ironman',
  'ultimate ironman',
  'group ironman',
  'normal',
];

const PAGE_LENGTH = 25;

interface HiscoresNavProps {
  type: string;
  page: number;
  pageLength: number;
  onPageChangeHandler: (page: number) => void;
  onFilterChangeHandler: (filter: string) => void;
  showFilters: boolean;
  showTitle: boolean;
}

const HiscoresNav = (props: HiscoresNavProps) => {
  let className = 'bg-primary border-4 border-black';

  // if not showing title, element is probably the footer nav
  // remove top border
  if (!props.showTitle) {
    className = `${className} border-t-0`;
  }

  return (
    <div className={className}>
      <div className='flex justify-between'>
        <h2 className='w-[20%]'>
          {props.page > 1 &&
            <a className='text-white text-[20px] hover:cursor-pointer' onClick={() => props.onPageChangeHandler(props.page - 1)}>&lt; Page {props.page - 1}</a>
          }
        </h2>
        {props.showTitle &&
          <h1 className='text-center capitalize'>{props.type} Hiscores</h1>
        }
        <h2 className='w-[20%]'>
          {props.pageLength == PAGE_LENGTH &&
            <a className='text-white text-[20px] hover:cursor-pointer' onClick={() => props.onPageChangeHandler(props.page + 1)}>Page {props.page + 1} &gt;</a>
          }
        </h2>
      </div>
      {props.showFilters &&
        <div className='hiscores-filters flex flex-wrap justify-around'>
          {HISCORES_FILTERS.map((filter, i) => {
            return (
              <ActiveElement
                tagName='a'
                activeClass='!text-white'
                className='text-orange text-[20px] font-bold capitalize cursor-pointer hover:text-white'
                name='hiscores-filter'
                clickHandler={() => props.onFilterChangeHandler(filter)}
                isActive={i == 0}
              >
                {filter}
              </ActiveElement>
            );
          })}
        </div>
      }
    </div>
  );
};

export default HiscoresNav;
