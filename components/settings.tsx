'use client';

import React from 'react';

import NavLink from '@/components/nav-link';
import ThemeToggle from '@/components/theme-toggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import SettingsIcon from '@/assets/images/settings.png';

const Settings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NavLink href='#settings' icon={SettingsIcon}>
          Settings
        </NavLink>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>collectionlog.net settings</DialogTitle>
        </DialogHeader>
        <div className='h-full p-2 shadow-log'>
          <div className='grid h-full grid-cols-5 items-center gap-2 border border-light p-2'>
            <p className='col-span-2 md:col-span-3 text-lg'>Theme color</p>
            <ThemeToggle className='col-span-3 md:col-span-2' />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
