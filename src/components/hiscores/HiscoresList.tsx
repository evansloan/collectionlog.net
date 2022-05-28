import { capitalize } from '@utils/format';

interface HiscoresListProps {
  page: number;
  data: any[];
  isLoaded: boolean;
}

const HiscoresList = (props: HiscoresListProps) => {
  const pageLimit = 25;
  const headers = [
    'Rank',
    'Username',
    'Counts',
  ];

  return (
    <div className='bg-primary text-center border-4 border-black border-t-0'>
      <div className='flex justify-around'>
        {headers.map((header) => {
          return <h2 className='w-1/3'>{header}</h2>
        })}
      </div>
      {props.data.map((user: any, i: number) => {
        let className = 'flex justify-around';
        if (i % 2 == 0) {
          className = `${className} bg-light`;
        }
        return (
          <div key={`${user.username}${i}`} className={className}>
            <p className='w-1/3 m-0 text-[24px] text-white text-center'>
              {(pageLimit * (props.page - 1)) + (i + 1)}.
            </p>
            <div className='flex justify-center items-center w-1/3'>
              {user.accountType && user.accountType != 'NORMAL' &&
                <img
                  className='h-[20px] mr-[5px] icon-shadow'
                  src={`https://oldschool.runescape.wiki/images/${capitalize(user.accountType)}_chat_badge.png`}
                />
              }
              <p className='m-0 text-[24px] text-orange text-center'>
                <a href={`/${user.username}`}>{user.username}</a>
              </p>
            </div>
            <p className='w-1/3 m-0 text-[24px] text-yellow text-center'>
              {user.obtained}/{user.total}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HiscoresList;
