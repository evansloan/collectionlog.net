import icons from '../../assets/data/item-icons.json';
import { formatDate } from '../../utils';

interface ItemProps {
  item: CollectionLogItem;
  showQuantity?: boolean;
  showTooltip?: boolean;
  isLink?: boolean;
  isDetail?: boolean;
}

const Item = (props: ItemProps) => {
  const { item, showQuantity, showTooltip, isDetail } = props;
  const {
    id,
    name,
    quantity,
    obtained,
    obtainedAt,
  } = item;

  const wrapperClassName = (isDetail) ? 'w-[50px] h-[50px] mb-[10px]' : 'w-1/4 sm:w-1/5 md:w-[16.6%] h-[50px] mb-[10px]';

  const displayQuantity = showQuantity && quantity ? quantity : '\u00a0';

  return (
    <div key={item.id} className={wrapperClassName}>
      {!isDetail &&
        <span className='relative top-[25%] left-[2%] md:top-[20%] md:left-[15%] text-yellow'>{displayQuantity}</span>
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
          <a
            className='flex w-full'
            href={`https://oldschool.runescape.wiki/w/${name.replace(/ /g, '_')}`} target='_blank' rel='noreferrer'
          >
            <img
              className={obtained ? '' : 'opacity-[0.35]'}
              src={`data:image/jpeg;charset=utf-8;base64,${(icons as { [key: string]: string })[id]}`}
            />
          </a>
        }
      </div>
    </div>
  );
};

export default Item;
