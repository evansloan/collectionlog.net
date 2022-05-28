import React from 'react';

import { FlexSection, LogButton, LogInput } from '@components/ui';
import { capitalize } from '@utils/format';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { RootState } from 'src/store/store';
import { fetchCollectionLog } from 'src/store/collectionlog/actions';

const LogHeader = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.collectionLog);
  let username = state.username;

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    username = e.target.value;
  }

  const onSearch = (event: React.FormEvent, username: string) => {
    event.preventDefault();
    console.log('onSearch');
    dispatch(fetchCollectionLog(username));
  }

  const getItemCounts = (unique?: boolean): string => {
    if (!state.data) {
      return `${0}/${0}`;
    }

    const key = unique ? 'unique' : 'total';
    
    const obtained = state.data[`${key}_obtained`];
    const total = state.data[`${key}_items`];

    return `${obtained}/${total}`;
  }

  return (
    <FlexSection
      direction='flex-col lg:flex-row'
      justify='justify-start lg:justify-between'
      width='w-full'
      padding='p-0'
    >
      <form className='lg:w-[30%]' onSubmit={(e) => onSearch(e, username as string)}>
        <LogInput
          className='h-[100%] w-[65%]'
          changeHandler={onUsernameChange}
          name='activeUser'
          placeholder='Enter username...'
          type='text'
        />
        <LogButton className='h-[100%] w-[35%] border-b-0 border-t-0' type='submit'>Search</LogButton>
      </form>
      <div className='m-[3px] grow page-title'>
        <h1>
          {state.data?.account_type && state.data?.account_type != 'NORMAL' &&
            <img
              className='inline-block w-[20px] mr-[5px] mt-[-10px] icon-shadow'
              src={`https://oldschool.runescape.wiki/images/${capitalize(state.data.account_type)}_chat_badge.png`}
            />
          }
          {username &&
            `${username}'s `
          }
          Collection Log
        </h1>
        <p className='m-0 text-[20px] text-orange text-shadow text-center font-bold'>
          Unique: <span className='text-white'>{getItemCounts(true)} </span>
          Total: <span className='text-white'>{getItemCounts()}</span>
        </p>
      </div>
      {state.error ?
        <div className='lg:w-[30%] px-2 text-[20px] text-error text-center'>
          <p className='m-0'>{state.error}</p>
        </div>
        :
        <div className='spacer hidden lg:block'></div>
      }
    </FlexSection>
  )
}

export default LogHeader;
