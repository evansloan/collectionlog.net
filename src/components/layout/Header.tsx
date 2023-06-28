import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CollectionLogAPI } from '../../api/collection-log/collection-log-api';
import discordIcon from '../../assets/images/discord.png';
import { discordUrl } from '../../app/constants';
import { AccountIcon, Button, DropDown, Input } from '../elements';
import AnalyticsService from '../../services/analytics';

interface TypeaheadCache {
  users: User[];

  /**
   * Search query when the request was made
   */
  searchQuery: string;

  /**
   * Search length when the request was made
   */
  requestMadeAtLength: number;
}

const Header = () => {
  /**
   * Search debounce time in milliseconds
   */
  const searchDebounce = 250;

  /**
   * Default state of the typeahead cache
   */
  const initStateTypeaheadCache = () => {
    return {
      users: [],
      searchQuery: '',
      requestMadeAtLength: 0,
    };
  };

  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [typeaheadCache, setTypeaheadCache] = useState<TypeaheadCache>(initStateTypeaheadCache);
  const [typeahead, setTypeahead] = useState<User[]>([]);

  const navigate = useNavigate();
  const api = CollectionLogAPI.getInstance();

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearchChange(search);
    }, searchDebounce);

    return () => clearTimeout(debounce);

  }, [search]);

  useEffect(() => {
    filterTypeahead(search);
  }, [typeaheadCache]);

  const onSearchChange = (search: string) => {
    // Only inputting spaces will not result in an API call
    if (search.trim() === '') {
      setTypeahead([]);
      return;
    }

    if (search[0] !== typeaheadCache.searchQuery[0] || search.length < typeaheadCache.requestMadeAtLength) {
      api.getUserTypeahead(search).then((res) => setTypeaheadCache({
        users: res.data.users,
        searchQuery: search,
        requestMadeAtLength: search.length }));
    } else {
      filterTypeahead(search);
    }
  };

  const filterTypeahead = (search: string) => {
    const maxShownResults = 5;
    let matchedUsers = 0;
    const filter: User[] = Array(maxShownResults);

    if (search === '') {
      setTypeahead(filter);
      return;
    }

    const searchValue = search.toLowerCase();
    for (const user of typeaheadCache.users) {
      if (matchedUsers >= maxShownResults) {
        break;
      }

      const partialUsername = user.username.toLowerCase().slice(0, search.length);
      if (partialUsername !== searchValue) {
        continue;
      }

      filter[matchedUsers] = user;
      matchedUsers++;
    }

    setTypeahead(filter);
  };

  const onTypeaheadClick = (username: string) => {
    navigateToUser(username);
  };

  const onSearch = () => {
    if (search == '') {
      return;
    }

    if (!typeahead.some((user) => user.username === search)) {
      return;
    }

    navigateToUser(search);
  };

  const navigateToUser = (username: string) => {
    setIsSearchOpen(false);
    navigate(`log/${username}`);
    AnalyticsService.clUserSearchEvent(username);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const onOpened = () => {
    setIsSearchOpen(true);
    const searchInput = document.getElementById('input-search');
    searchInput?.focus();
  };

  const onClosed = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <div className='hidden md:flex justify-around w-full mb-2 p-2 bg-primary border-b-4 border-b-black text-lg shadow-log'>
        <Link to='/'>Home</Link>
        <DropDown
          title='Search users'
          isOpen={isSearchOpen}
          closeOnClick={false}
          onOpened={onOpened}
          onClosed={onClosed}
        >
          <form onSubmit={onSubmit}>
            <div className='flex flex-col justify-around'>
              <Input
                id='input-search'
                placeholder='Enter username...'
                className='md:w-[400px] mb-1'
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value ?? '')}
              />
              {typeahead?.length > 0 &&
                <div className='flex flex-col my-2'>
                  {typeahead.map((user, i) => {
                    const { id, username, accountType } = user;
                    const bg = i % 2 == 0 ? 'bg-primary' : 'bg-light';
                    return (
                      <button
                        type='button'
                        key={`${id}-${i}`}
                        className={`flex items-center p-2 ${bg} hover:bg-highlight text-shadow cursor-pointer`}
                        onClick={() => onTypeaheadClick(username)}
                      >
                        <AccountIcon accountType={accountType} height='20px' />
                        <p className='mx-2 text-xl'>{username}</p>
                      </button>
                    );
                  })}
                </div>
              }
              <Button title='Search' type='button' onClick={(onSearch)}/>
            </div>
          </form>
        </DropDown>
        <Link to='/hiscores/1'>Hiscores</Link>
        <div className='flex'>
          <img className='w-[25px] mr-2' src={discordIcon} />
          <a href={discordUrl}>Join the Log Hunters Discord server</a>
        </div>
      </div>
      <div className='flex md:hidden justify-around w-full mb-2 p-2 bg-primary border-b-4 border-b-black text-lg shadow-log sticky top-0 z-50'>
        <DropDown title='Menu' closeOnClick={true}>
          <Link to='/'>Home</Link>
          <Link to='/hiscores/1'>Hiscores</Link>
          <div className='flex'>
            <a href={discordUrl}>Join the Log Hunters Discord server</a>
            <img className='w-[25px] ml-2' src={discordIcon} />
          </div>
        </DropDown>
      </div>
      <form className='md:hidden w-[95%] m-auto mb-2' onSubmit={onSubmit}>
        <div className='flex flex-col justify-around'>
          <Input
            id='input-search'
            placeholder='Enter username...'
            className='md:w-[400px] mb-1'
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value ?? '')}
          />
          {typeahead?.length > 0 &&
            <div className='flex flex-col mb-2'>
              {typeahead.map((user, i) => {
                const { id, username, accountType } = user;
                const bg = i % 2 == 0 ? 'bg-primary' : 'bg-light';
                return (
                  <button
                    type='button'
                    key={`${id}-${i}`}
                    className={`flex justify-center items-center p-2 ${bg} hover:bg-highlight text-shadow cursor-pointer`}
                    onClick={() => onTypeaheadClick(username)}
                  >
                    <AccountIcon accountType={accountType} height='20px' />
                    <p className='mx-2'>{username}</p>
                  </button>
                );
              })}
            </div>
          }
          <Button title='Search' type='button' onClick={(onSearch)}/>
        </div>
      </form>
    </>
  );
};

export default Header;
