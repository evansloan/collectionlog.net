import Items from './Items';
import { TestUtilities } from '../../tests';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

const entryName = 'Master Treasure Trails (Rare)';
const killCount: CollectionLogKillCount = {
  name: 'Master clues completed',
  amount: 1,
};

const completedCollection = Array<CollectionLogItem>(
  TestUtilities.createCollectionLogItem('3rd age longsword'),
  TestUtilities.createCollectionLogItem('3rd age wand'),
  TestUtilities.createCollectionLogItem('3rd age bow')
);

const incompleteCollection = Array<CollectionLogItem>(
  TestUtilities.createCollectionLogItem('3rd age longsword'),
  TestUtilities.createCollectionLogItem('3rd age wand'),
  TestUtilities.createCollectionLogItem('3rd age bow', false)
);

const emptyCollection = Array<CollectionLogItem>(
  TestUtilities.createCollectionLogItem('3rd age longsword', false),
  TestUtilities.createCollectionLogItem('3rd age wand', false),
  TestUtilities.createCollectionLogItem('3rd age bow', false)
);

describe(`${Items.name} component`, () => {
  test.each([
    ['text-green', completedCollection],
    ['text-yellow', incompleteCollection],
    ['text-red', emptyCollection],
  ])(
    'should have obtainedClass: %p',
    (expectedObtainedClass: string, items: CollectionLogItem[]) => {
      const { container } = render(<Items name={entryName} items={items} killCount={[killCount]}/>);
      const span = container.querySelector('p.text-orange span');
      expect(span).toBeTruthy();
      expect(span?.className).toBe(expectedObtainedClass);
    }
  );

  test.each([
    ['3/3', completedCollection],
    ['2/3', incompleteCollection],
    ['0/3', emptyCollection],
  ])(
    'should have completed: %p',
    (expectedCompletion: string, items: CollectionLogItem[]) => {
      const { container } = render(<Items name={entryName} items={items} killCount={[killCount]}/>);
      const span = container.querySelector('p.text-orange span');
      expect(span).toBeTruthy();
      expect(span?.innerHTML).toBe(expectedCompletion);
    }
  );

  test(`should have '${killCount.name}' to be '${killCount.amount}'`, () => {
    const render = renderer.create(<Items name={entryName} items={[]} killCount={[killCount]}/>);
    expect(render).toMatchSnapshot();
  });

  test('should display collection',
    () => {
      const render = renderer.create(<Items name={entryName} items={completedCollection} killCount={[killCount]}/>);
      expect(render).toMatchSnapshot();
    }
  );
});
