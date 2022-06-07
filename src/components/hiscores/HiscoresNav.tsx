import { ActiveElement } from '@components/ui';

import { fetchHiscores } from '@store/hiscores/actions';
import { useAppDispatch, useAppSelector } from '@store/hooks';

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
  pageLength: number;
  showFilters: boolean;
  showTitle: boolean;
}

const HiscoresNav = (props: HiscoresNavProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.hiscores);

  let className = 'bg-primary border-4 border-black';

  /*
   * if not showing title, element is probably the footer nav
   * remove top border
   */
  if (!props.showTitle) {
    className = `${className} border-t-0`;
  }

  const onPageChange = (page: number) => {
    dispatch(fetchHiscores(state.type, page, state.filter));
  };

  const onFilterChange = (filter: string) => {
    const accountType = filter.replace(/ /g, '_');
    dispatch(fetchHiscores(state.type, 1, accountType));
  };

  return (
    <div className={className}>
      <div className='flex justify-between'>
        <h2 className='w-[20%]'>
          {state.page > 1 &&
            <a className='text-white text-[20px] hover:cursor-pointer select-none no-underline' onClick={() => onPageChange(state.page - 1)}>&lt; Page {state.page - 1}</a>
          }
        </h2>
        {props.showTitle &&
          <h1 className='text-center capitalize'>{state.type} Hiscores</h1>
        }
        <h2 className='w-[20%]'>
          {props.pageLength == PAGE_LENGTH &&
            <a className='text-white text-[20px] hover:cursor-pointer select-none no-underline' onClick={() => onPageChange(state.page + 1)}>Page {state.page + 1} &gt;</a>
          }
        </h2>
      </div>
      {props.showFilters &&
        <div className='hiscores-filters flex flex-wrap justify-around'>
          {HISCORES_FILTERS.map((filter, i) => {
            return (
              <ActiveElement
                key={`${filter}-${i}`}
                tagName='a'
                activeClass='!text-white'
                className='text-orange text-[20px] font-bold capitalize cursor-pointer hover:text-white'
                name='hiscores-filter'
                clickHandler={() => onFilterChange(filter)}
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
