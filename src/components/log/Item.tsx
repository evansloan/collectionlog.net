import { Item as ElementItem } from '../elements';

interface EntryItemProps {
	item: CollectionLogItem;
}

const Item = (props: EntryItemProps) => {
  const { item } = props;

  return (
    <ElementItem item={item} showQuantity={true} showTooltip={true} />
  );
};

export default Item;
