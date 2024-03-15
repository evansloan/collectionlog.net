'use client';

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, toTitleCase } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeValues = ['dark', 'light', 'system'];

  const onThemeSelect = (value: string) => {
    setTheme(value);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          role='combobox'
          variant='combo'
          className={cn('w-full justify-between', className)}
        >
          {toTitleCase(theme!)}
          <ChevronDown className='ml-2 h-6 w-6 shrink-0' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandGroup>
            {themeValues.map((value) => (
              <CommandItem
                className='flex justify-between text-lg'
                key={value}
                value={value}
                onSelect={() => onThemeSelect(value)}
              >
                {toTitleCase(value)}
                <Check
                  className={cn(
                    'ml-2 h-4 w-4',
                    theme === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeToggle;
