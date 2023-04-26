import Item from './Item';
import renderer from 'react-test-renderer';
import { TestUtilities } from '../../tests';

describe(`${Item.name} component`, () => {
  test(
    'should render',
    () => {
      const render = renderer.create(<Item item={TestUtilities.createCollectionLogItem()}/>);
      expect(render).toMatchSnapshot();
    });
});
