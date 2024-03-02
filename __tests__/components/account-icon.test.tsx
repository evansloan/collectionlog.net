import renderer from 'react-test-renderer';

import AccountIcon from '@/components/account-icon';

describe(`${AccountIcon.displayName} component`, () => {
  const accountTypes: AccountType[] = [
    'NORMAL',
    'IRONMAN',
    'HARDCORE_IRONMAN',
    'ULTIMATE_IRONMAN',
    'GROUP_IRONMAN',
    'HARDCORE_GROUP_IRONMAN',
    'UNRANKED_GROUP_IRONMAN',
  ];

  test.each(accountTypes)('should render with "$accountType" icon', (accountType) => {
    const render = renderer
      .create(<AccountIcon accountType={accountType} />)
      .toJSON();
    expect(render).toMatchSnapshot();
  });
});
