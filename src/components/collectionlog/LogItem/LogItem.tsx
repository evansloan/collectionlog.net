import './LogItem.scss';

import icons from '../../../data/item-icons.json';
import { CollectionLogItemData } from '@models/CollectionLog';

type LogItemProps = {
  item: CollectionLogItemData | any;
};

const LogItem = (props: LogItemProps) => {
  const itemId = typeof props.item.id == 'number' ? props.item.id : props.item.itemId;
  return (
    <div className='item h-[50px] w-[16.6%] mb-[10px]'>
      <span className='item-quantity'>{props.item.quantity > 0 ? props.item.quantity : '\u00a0'}</span>
      <span className='item-tooltip'>
        <a className='text-base' href={`https://oldschool.runescape.wiki/w/${props.item.name.replace(/ /g, '_')}`} target='_blank'>{props.item.name}</a>
      </span>
      <div className='item-img-container'>
        <img
          className={props.item.obtained ? 'item-obtained' : ''}
          src={`data:image/jpeg;charset=utf-8;base64,${(icons as {[key: string]: string})[itemId]}`}>
        </img>
      </div>
    </div>
  );
};

export default LogItem;