'use client';

import React from 'react';
import Image from 'next/image';

import AccountIcon from '@/components/account-icon';
import UserTypeahead from '@/components/typeahead/user-typeahead';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useCollectionlogContext } from '@/components/providers/collection-log-provider';
import { useLoadingContext } from '@/components/providers/loading-provider';
import { cn } from '@/lib/utils';

import compareIcon from '@/assets/images/collectionlog-sm.png';
import searchIcon from '@/assets/images/search.png';

interface CollectionLogHeaderProps {
  defaultRankType: RankType;
  includeSearch?: boolean;
  isSearchOpen?: boolean;
  onSearchClick?: () => void;
  className?: string;
}

const CollectionLogHeader = ({
  defaultRankType,
  includeSearch,
  isSearchOpen,
  onSearchClick,
  className,
}: CollectionLogHeaderProps) => {
  const collectionLog = useCollectionlogContext();
  const { setIsLoading } = useLoadingContext();
  const { username, uniqueObtained, uniqueItems } = collectionLog;

  const buttonWrapperClass = 'hidden w-1/5 md:block lg:w-1/12 !-mt-2';
  const searchButton = (
    <Button className='flex w-full justify-center' onClick={onSearchClick}>
      <Image src={searchIcon} alt='search icon' className='flex-shrink-0' />
      {isSearchOpen ? 'Back' : 'Search'}
    </Button>
  );

  return (
    <CardHeader
      className={cn(
        `flex flex-col items-center justify-center pb-0 md:flex-row ${includeSearch ? 'md:justify-between' : ''}`,
        className
      )}
    >
      {includeSearch && (
        <div className={buttonWrapperClass}>{searchButton}</div>
      )}
      <div className='!mt-0 items-center'>
        <CardTitle className='flex items-center justify-center gap-2'>
          <AccountIcon accountType={collectionLog.accountType} />
          {username}&apos;s Collection Log
        </CardTitle>
        <div className='flex justify-center gap-2 text-lg font-semibold text-rs-orange'>
          Obtained:{' '}
          <span className='text-white'>
            {uniqueObtained}/{uniqueItems}
          </span>

        </div>
      </div>
      {includeSearch && (
        <>
          <div className={buttonWrapperClass}>
            <UserTypeahead
              navigateTo={(username2) => `/compare/${username}/${username2}`}
              inputProps={{
                placeholder: 'Search user to compare with...',
              }}
              maxResults={15}
              onResultClick={() => setIsLoading(true)}
              usePopover
            >
              <Button className='hidden lg:flex w-full justify-center'>
                <Image src={compareIcon} alt='compare icon' className='flex-shrink-0' />
                Compare
              </Button>
            </UserTypeahead>
          </div>
          <div className='!mb-2 w-11/12 sm:w-1/2 md:hidden md:w-full'>
            {searchButton}
          </div>
        </>
      )}
    </CardHeader>
  );
};

export default CollectionLogHeader;
