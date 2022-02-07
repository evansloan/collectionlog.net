import './LogItem.scss';

import icons from '../../../data/item-icons.json';

type LogItemProps = {
  item: any;
};

const LogItem = (props: LogItemProps) => (
  <div className='item'>
    <span className='item-quantity'>{props.item.quantity > 0 ? props.item.quantity : '\u00a0'}</span>
    <span className='item-tooltip'>
      <a href={`https://oldschool.runescape.wiki/w/${props.item.name.replace(/ /g, '_')}`} target='_blank'>{props.item.name}</a>
    </span>
    <div className='item-img-container'>
      <img
        className={props.item.obtained ? 'item-obtained' : ''}
        src={`data:image/jpeg;charset=utf-8;base64,${(icons as {[key: string]: string})[props.item.id]}`}>
      </img>
    </div>
  </div>
);

export default LogItem;