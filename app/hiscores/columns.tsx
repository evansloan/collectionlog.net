'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/table-core';

import AccountIcon from '@/components/account-icon';
import { formatInt } from '@/lib/utils';

export const columns: ColumnDef<Hiscores>[] = [
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell: ({
      row: {
        original: { rank },
      },
    }) => formatInt(rank),
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({
      row: {
        original: { username },
      },
    }) => <Link href={`/log/${username}`}>{username}</Link>,
  },
  {
    accessorKey: 'accountType',
    header: 'Account Type',
    cell: ({
      row: {
        original: { accountType },
      },
    }) => (
      <div className='flex w-full justify-center'>
        <AccountIcon accountType={accountType} />
      </div>
    ),
  },
  {
    cell: ({
      row: {
        original: { obtained, total },
      },
    }) => (
      <span className='text-rs-yellow'>
        {obtained}/{total}
      </span>
    ),
    header: 'Obtained',
  },
];
