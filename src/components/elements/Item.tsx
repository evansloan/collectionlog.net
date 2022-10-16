import icons from '../../assets/data/item-icons.json';
import { formatDate } from '../../utils';

interface LogItemProps {
  item: CollectionLogItem;
  showQuantity?: boolean;
  showTooltip?: boolean;
  isLink?: boolean;
}

const LogItem = (props: LogItemProps) => {
  const { item, showQuantity, showTooltip } = props;
  const {
    id,
    name,
    quantity,
    obtained,
    obtainedAt,
  } = item;

  return (
    <div key={item.id} className='w-1/4 sm:w-1/5 md:w-[16.6%] h-[50px] mb-[10px]'>
      {showQuantity &&
        <span className='relative top-[25%] left-[2%] md:top-[20%] md:left-[15%] text-yellow'>{quantity ? quantity : '\u00a0'}</span>
      }
      <div className='flex justify-center h-[45px] group'>
        {showTooltip ?
          <>
            <a
              className='hidden flex-col items-center justify-center mb-6 h-full group-hover:flex no-underline'
              href={`https://oldschool.runescape.wiki/w/${name.replace(/ /g, '_')}`} target='_blank' rel='noreferrer'
            >
              <p className='whitespace-nowrap'>{name}</p>
              {obtainedAt &&
                <p>{formatDate(obtainedAt)}</p>
              }
            </a>
            <img
              className={obtained ? 'group-hover:hidden' : 'opacity-[0.35] group-hover:hidden'}
              src={`data:image/jpeg;charset=utf-8;base64,${(icons as { [key: string]: string })[id]}`}
            />
          </>
          :
          <img
            className={obtained ? '' : 'opacity-[0.35]'}
            src={`data:image/jpeg;charset=utf-8;base64,${(icons as { [key: string]: string })[id]}`}
          />
        }
      </div>
    </div>
  );
};

export default LogItem;
