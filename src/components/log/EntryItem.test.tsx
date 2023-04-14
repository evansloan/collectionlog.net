import EntryItem from './EntryItem';
import renderer from 'react-test-renderer';
import { TestUtilities } from '../../tests';

describe(`${EntryItem.name} component`, () => {
  test(
    'should render',
    () => {
      const render = renderer.create(<EntryItem item={TestUtilities.createCollectionLogItem()}/>);
      expect(render).toMatchSnapshot();
    });
});