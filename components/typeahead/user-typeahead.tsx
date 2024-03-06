'use client';

import { InputProps } from '@/components/ui/input';
import React, { ChangeEvent, HTMLAttributes, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

import AccountIcon from '@/components/account-icon';
import { Typeahead } from '@/components/typeahead';
import { fetchUserTypeahead } from '@/components/typeahead/actions';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface UserTypeaheadProps {
  children?: ReactNode;
  navigateTo?: (username: string) => Promise<string>;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onResultClick?: (result: User) => void;
  usePopover?: boolean;
  inputProps?: InputProps;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  maxResults?: number;
}

const UserTypeahead = ({
  children,
  navigateTo,
  onValueChange,
  onResultClick,
  usePopover,
  inputProps,
  containerProps,
  maxResults,
}: UserTypeaheadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const filterResults = (user: User, typeaheadValue: string) => {
    const partial = user.username.slice(0, typeaheadValue.length).toLowerCase();
    return partial === typeaheadValue.toLowerCase();
  };

  const onClick = async (user: User) => {
    setIsOpen(false);

    if (onResultClick) {
      onResultClick(user);
    }

    if (navigateTo) {
      return router.push(await navigateTo(user.username));
    }
  };

  const onTypeaheadSubmit = async (users: User[]) => {
    const { username } = users[0];
    setIsOpen(false);

    if (navigateTo) {
      router.push(await navigateTo(username));
    }
  };

  const renderResults = (user: User, i: number) => {
    const bg = i % 2 ? 'bg-light' : 'bg-card';
    return (
      <button
        key={`typeahead-${user.username}-${i}`}
        className={`flex w-full justify-center border-0 ${bg} p-2 text-lg transition-all hover:bg-accent`}
        type='button'
        onClick={() => onClick(user)}
      >
        <div className='flex items-center gap-2'>
          <AccountIcon accountType={user.accountType} />
          <p>{user.username}</p>
        </div>
      </button>
    );
  };

  const className = usePopover
    ? 'sm:w-2/3 md:w-1/2 lg:w-1/3 text-center text-lg'
    : '';

  const typeahead = (
    <Typeahead
      fetchResults={fetchUserTypeahead}
      renderResults={renderResults}
      filterResults={filterResults}
      onTypeaheadSubmit={onTypeaheadSubmit}
      onValueChange={onValueChange}
      inputProps={{
        className,
        ...inputProps,
      }}
      containerProps={containerProps}
      maxResults={maxResults}
    />
  );

  return (
    <>
      {usePopover ? (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <SheetTrigger asChild>{children}</SheetTrigger>
          <SheetContent
            side='top'
            className='flex flex-col items-center border-0 bg-transparent p-2'
          >
            {typeahead}
          </SheetContent>
        </Sheet>
      ) : (
        typeahead
      )}
    </>
  );
};

export default UserTypeahead;
