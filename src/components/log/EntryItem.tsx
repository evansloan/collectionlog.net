import { Item } from '../elements';

interface EntryItemProps {
	item: CollectionLogItem;
	number: number;
}

const EntryItem = (props: EntryItemProps) => {
  const { item, number } = props;

  return (
    <Item key={`${number}-${item.id}`} item={item} showQuantity={true} showTooltip={true} />
  );
};

export default EntryItem;