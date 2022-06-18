import { AccountType } from '@models/CollectionLog';
import { HiscoresData } from '@models/Hiscores';

import { capitalize } from '@utils/format';

interface HiscoresListProps {
  page: number;
  data?: HiscoresData[];
}

const HiscoresList = (props: HiscoresListProps) => {
  const headers = [
    'Rank',
    'Username',
    'Counts',
  ];

  return (
    <div className='bg-primary text-center border-4 border-black border-t-0'>
      <div className='flex justify-around'>
        {headers.map((header, i) => {
          return <h2 key={`${header}-${i}`} className='w-1/4'>{header}</h2>;
        })}
      </div>
      {props.data?.map((user, i) => {
        let className = 'flex justify-around';
        if (i % 2 == 0) {
          className = `${className} bg-light`;
        }
        return (
          <div key={`${user.username}${i}`} className={className}>
            <p className='w-1/3 m-0 text-[24px] text-white text-center'>
              {user.rank}.
            </p>
            <div className='flex justify-center items-center w-1/3'>
              {user.account_type && user.account_type != AccountType.NORMAL &&
                <img
                  className='h-[20px] mr-[5px] icon-shadow'
                  src={`https://oldschool.runescape.wiki/images/${capitalize(user.account_type)}_chat_badge.png`}
                />
              }
              <p className='m-0 text-[24px] text-center'>
                <a href={`/${user.username}`}>{user.username}</a>
              </p>
            </div>
            <p className='w-1/3 m-0 text-[24px] text-yellow'>
              {user.obtained}/{user.total}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HiscoresList;
