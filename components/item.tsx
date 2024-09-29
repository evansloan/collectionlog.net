'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import iconsJson from '@/assets/images/items.json';
import { cn, formatDate, getLocale } from '@/lib/utils';

const WIDTH_DEFAULT = 36;
const HEIGHT_DEFAULT = 36;

interface ItemProps {
  item: CollectionLogItem;
  includeDetails?: boolean;
  showQuantity?: boolean;
  showHover?: boolean;
  width?: number;
  height?: number;
}

const Item = ({
  item,
  includeDetails,
  showQuantity,
  showHover,
  width,
  height,
}: ItemProps) => {
  const [locale, setLocale] = useState('en');
  width = width ?? WIDTH_DEFAULT;
  height = height ?? HEIGHT_DEFAULT;

  const itemIcons = iconsJson as { [key: string]: string };
  const icon = item.id in itemIcons ? itemIcons[item.id] : itemIcons['unknownIcon'];
  const wrapperClass = includeDetails ? 'grid grid-cols-2 sm:grid-cols-3' : '';
  const hoverClass = showHover ? 'group-hover:hidden' : '';

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  return (
    <div className={`${wrapperClass}`}>
      <div className='group relative flex h-full items-center justify-center gap-x-2'>
        {showQuantity && (
          <span
            className={`absolute -ml-14 mt-[-5px] self-start text-rs-yellow ${hoverClass}`}
          >
            {item.quantity !== 0 ? item.quantity : <>&nbsp;</>}
          </span>
        )}
        {showHover && (
          <a
            className='hidden flex-col items-center justify-center text-sm text-white no-underline group-hover:flex'
            href={`https://oldschool.runescape.wiki/w/${item.name.replace(' ', '_')}`}
            target='_blank'
            rel='noreferrer'
          >
            <p className='whitespace-nowrap'>{item.name}</p>
            {item.obtainedAt && <p>{formatDate(item.obtainedAt, locale)}</p>}
          </a>
        )}
        <Image
          src={`data:image/jpeg;charset=utf-8;base64,${icon}`}
          alt={`${item.name}`}
          width={width}
          height={height}
          className={`${!item.obtained ? 'opacity-[0.35]' : ''} ${hoverClass}`}
        />
      </div>
      {includeDetails && (
        <div className='flex flex-col sm:col-span-2'>
          {item.username && (
            <a
              href={`/log/${item.username}`}
              className='text-rs-orange underline'
            >
              {item.username}
            </a>
          )}
          <p className='overflow-ellipsis whitespace-nowrap'>{item.name}</p>
          {item.obtainedAt && <p>{formatDate(item.obtainedAt, locale)}</p>}
        </div>
      )}
    </div>
  );
};

export default Item;
