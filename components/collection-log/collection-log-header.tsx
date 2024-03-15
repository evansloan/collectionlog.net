'use client';

import React from 'react';
import Image from 'next/image';

import AccountIcon from '@/components/account-icon';
import UserTypeahead from '@/components/typeahead/user-typeahead';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatAccountType } from '@/lib/collection-log-helpers';
import { useCollectionlogContext } from '@/components/providers/collection-log-provider';
import { cn, formatInt } from '@/lib/utils';

import searchIcon from '@/assets/images/search.png';

interface CollectionLogHeaderProps {
  ranks: Ranks;
  defaultRankType: RankType;
  includeSearch?: boolean;
  isSearchOpen?: boolean;
  onSearchClick?: () => void;
  className?: string;
}

const CollectionLogHeader = ({
  ranks,
  defaultRankType,
  includeSearch,
  isSearchOpen,
  onSearchClick,
  className,
}: CollectionLogHeaderProps) => {
  const collectionLog = useCollectionlogContext();
  const { username, uniqueObtained, uniqueItems } = collectionLog;
  const defaultRankValue = ranks[defaultRankType];

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='flex items-center gap-x-1'>
                  Rank:{' '}
                  <span className='text-white'>
                    #{formatInt(defaultRankValue)}
                  </span>
                  <AccountIcon accountType={defaultRankType} width={15} />
                </div>
              </TooltipTrigger>
              <TooltipContent className='text-lg'>
                {Object.keys(ranks).map((rankType, i) => {
                  const rank = ranks[rankType as RankType];
                  if (rank) {
                    return (
                      <div
                        key={`${username}-${rankType}-${i}`}
                        className='flex flex-col gap-2'
                      >
                        <p>
                          {formatAccountType(rankType as RankType)}: #{rank}
                        </p>
                      </div>
                    );
                  }
                })}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {includeSearch && (
        <>
          <div className={buttonWrapperClass}>
            <UserTypeahead
              navigateTo={async (username2) => {
                return `/compare/${username}/${username2}`;
              }}
              inputProps={{
                placeholder: 'Search user to compare with...',
              }}
              maxResults={15}
              usePopover
            >
              <Button className='hidden w-full lg:flex'>Compare</Button>
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
