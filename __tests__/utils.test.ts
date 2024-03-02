import { formatInt, hyphenate, sortAlphabetical, sortKeys } from '@/lib/utils';

describe('Utility function', () => {
  it('"formatInt" should place commas in the correct place within a number', () => {
    [1000, 10000, 100000, 1000000].forEach((num, i) =>
      expect(formatInt(num)[i % 3 + 1]).toEqual(',')
    );
  });

  const sortedTestValues = [
    'A test value',
    'The B test value',
    'C test value',
    'D test value',
    'The E test value',
    'F test value',
  ];

  it('"sortAlphabetical" should sort a list of strings in alphabetical order, ignoring the word "The"', () => {
    const testValues = [
      'C test value',
      'F test value',
      'A test value',
      'The B test value',
      'D test value',
      'The E test value',
    ];
    expect(sortAlphabetical(testValues)).toEqual(sortedTestValues);
  });

  it('"sortKeys" should sort keys of an object in alphabetical order, ignoring the word "The"', () => {
    const testObject = {
      'C test value': 0,
      'F test value': 1,
      'A test value': 2,
      'The B test value': 3,
      'D test value': 4,
      'The E test value': 5,
    };
    expect(Object.keys(sortKeys(testObject))).toEqual(sortedTestValues);
  });

  it('"hyphenate" should replace all spaces with hyphens in a string', () => {
    const testValue = 'Test value with multiple spaces';
    const hyphenIndexes = [...Array(testValue.length).keys()].filter(
      (i) => testValue[i] === ' '
    );

    const hyphenated = hyphenate(testValue);
    hyphenIndexes.forEach((i) => expect(hyphenated[i]).toBe('-'));
  });
});
