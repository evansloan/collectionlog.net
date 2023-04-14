import EntryItem from './EntryItem';
import renderer from 'react-test-renderer';

const stubCollectionLogItem: CollectionLogItem = {
  name: 'Collection log',
  obtained: true,
  obtainedAt: '01/01/2023',
  quantity: 1,
  username: 'Test User',
  id: 1,
  sequence: 1,
};

describe(`${EntryItem.name} component`, () => {
  test(
    'should render',
    () => {
      const render = renderer.create(<EntryItem item={stubCollectionLogItem}/>);
      expect(render).toMatchSnapshot();
    });
});