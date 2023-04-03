import { Item } from '../elements';

interface EntryItemProps {
	item: CollectionLogItem;
}

const EntryItem = (props: EntryItemProps) => {
  const { item } = props;

  return (
    <Item item={item} showQuantity={true} showTooltip={true} />
  );
};

export default EntryItem;