'use client';

import React, { useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { getUserPage } from '@/components/hiscores/actions';
import { UserTypeahead } from '@/components/typeahead';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatAccountType } from '@/lib/collection-log-helpers';
import { useQueryParams } from '@/lib/hooks';
import { cn, formatInt } from '@/lib/utils';

interface HiscoresSidebarProps {
  page: number;
  rankType: RankType;
  setIsSearching: (isSearching: boolean) => void;
}

const HiscoresSidebar = ({
  page,
  rankType,
  setIsSearching,
}: HiscoresSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rankTypeValue, setRankTypeValue] = useState<RankType>(rankType);
  const [errorMessage, setErrorMessage] = useState<string>();
  const updateParams = useQueryParams();

  const onPageClick = (page: number) => {
    setErrorMessage(undefined);
    updateParams({
      page: page.toString(),
      username: null,
    });
  };

  const onRankTypeChange = (value: RankType) => {
    setErrorMessage(undefined);
    setRankTypeValue(value);
    setIsOpen(false);
    updateParams({
      page: '1',
      accountType: value,
      username: null,
    });
  };

  const onSearch = async (username: string) => {
    if (!username || !username.trim().length) {
      return;
    }

    setErrorMessage(undefined);
    setIsSearching(true);
    let userPage = await getUserPage(username, rankTypeValue);
    if (!userPage) {
      userPage = page;
      setErrorMessage(
        `Unable to find user ${username} with rank type ${formatAccountType(rankTypeValue)}`
      );
    }

    setIsSearching(false);
    updateParams({
      page: userPage.toString(),
      username,
    });
  };

  const rankTypeDropdown: { value: RankType; label: string }[] = [
    {
      value: 'ALL',
      label: 'All',
    },
    {
      value: 'NORMAL',
      label: 'Normal',
    },
    {
      value: 'IRONMAN',
      label: 'Ironman',
    },
    {
      value: 'HARDCORE_IRONMAN',
      label: 'Hardcore Ironman',
    },
    {
      value: 'ULTIMATE_IRONMAN',
      label: 'Ultimate Ironman',
    },
    {
      value: 'GROUP_IRONMAN',
      label: 'Group Ironman',
    },
    {
      value: 'HARDCORE_GROUP_IRONMAN',
      label: 'Hardcore Group Ironman',
    },
    {
      value: 'UNRANKED_GROUP_IRONMAN',
      label: 'Unranked Group Ironman',
    },
  ];

  const buttonClass = 'h-10 px-2 w-1/2';

  return (
    <div className='col-span-1 flex flex-col gap-y-4 p-4 text-lg'>
      <div className='border-b border-light pb-4'>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              role='combobox'
              variant='combo'
              aria-expanded={isOpen}
              className='w-full justify-between'
            >
              {formatAccountType(rankTypeValue)}
              <ChevronDown className='ml-2 h-6 w-6 shrink-0' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandGroup>
                {rankTypeDropdown.map(({ value, label }) => (
                  <CommandItem
                    className='flex justify-between text-lg'
                    key={value}
                    value={value}
                    onSelect={() => onRankTypeChange(value)}
                  >
                    {label}
                    <Check
                      className={cn(
                        'ml-2 h-4 w-4',
                        rankTypeValue === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col items-center border-b border-light pb-4'>
        <UserTypeahead
          onResultClick={(result) => onSearch(result.username)}
          inputProps={{
            placeholder: 'Search users...',
          }}
          containerProps={{
            className: 'md:w-full lg:w-full mt-1',
          }}
        />
      </div>
      <div>
        <div className='flex gap-x-1'>
          <Button
            className={cn('mb-1', buttonClass)}
            disabled={page <= 1}
            onClick={() => onPageClick(page - 1)}
            size='auto'
          >
            <ChevronLeft className='h-4 w-4' />
            Page {formatInt(page === 1 ? page : page - 1)}
          </Button>
          <Button
            className={buttonClass}
            onClick={() => onPageClick(page + 1)}
            size='auto'
          >
            Page {formatInt(page + 1)}
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
      {errorMessage && (
        <p className='text-center text-rs-red'>{errorMessage}</p>
      )}
    </div>
  );
};

export default HiscoresSidebar;
