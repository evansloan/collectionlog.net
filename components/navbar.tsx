'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import NavLink from '@/components/nav-link';

import Settings from '@/components/settings';
import { useLoadingContext } from '@/components/providers/loading-provider';
import { Button } from '@/components/ui/button';
import UserTypeahead from '@/components/typeahead/user-typeahead';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DISCORD_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

import DiscordIcon from '@/assets/images/discord.png';
import HomeIcon from '@/assets/images/home.png';
import SearchIcon from '@/assets/images/search-users.png';
import StatsIcon from '@/assets/images/stats.png';

const Navbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { setIsLoading } = useLoadingContext();

  const navContents = (
    <>
      <NavLink href='/' icon={HomeIcon}>
        Home
      </NavLink>
      <UserTypeahead
        navigateTo={(username) => `/log/${username}`}
        inputProps={{
          placeholder: 'Search users...',
        }}
        maxResults={15}
        onResultClick={() => setIsLoading(true)}
        usePopover
      >
        <Button
          className='flex w-full justify-start gap-1 p-2 hover:text-rs-orange sm:w-auto'
          variant='ghost'
          size='auto'
        >
          <Image src={SearchIcon} height={25} width={25} alt='search-users' />
          Search users
        </Button>
      </UserTypeahead>
      <NavLink href='https://secure.runescape.com/m=hiscore_oldschool/overall?category_type=1&table=18' icon={StatsIcon}>
        Hiscores
      </NavLink>
      <NavLink href={DISCORD_URL} icon={DiscordIcon}>
        Join the Log Hunters Discord server
      </NavLink>
      <Settings />
    </>
  );

  return (
    <nav
      className={cn('mb-2.5 border-b-4 bg-card', className)}
      ref={ref}
      {...props}
    >
      <div className='hidden w-full justify-around gap-2 sm:flex'>
        {navContents}
      </div>
      <div className='flex justify-center sm:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='w-full p-2 text-lg hover:text-rs-orange'
              variant='ghost'
              size='auto'
            >
              Menu
              <ChevronDown height={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mt-2'>
            {navContents}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
});
Navbar.displayName = 'Navbar';
export default Navbar;
