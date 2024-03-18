import React from 'react';

import Item from '@/components/item';
import { OpenView } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface CollectionLogItemsProps {
  activeOpenView: OpenView;
  showQuantity: boolean;
  className?: string;
}

const CollectionLogItems = ({
  activeOpenView,
  showQuantity,
  className,
}: CollectionLogItemsProps) => {
  const {
    page: {
      name: pageName,
      data: { items, killCount },
    },
  } = activeOpenView;

  const itemCount = items.length;
  const obtainedCount = items.filter((item) => item.obtained).length;
  let obtainedColor = 'text-rs-yellow';
  if (itemCount === obtainedCount) {
    obtainedColor = 'text-rs-green';
  } else if (obtainedCount === 0) {
    obtainedColor = 'text-rs-red';
  }

  return (
    <div
      className={cn(
        'col-span-4 flex h-full flex-col overflow-hidden md:col-span-3',
        className
      )}
    >
      <div className='border-b border-b-lighter px-2 text-rs-orange shadow-log '>
        <h3>{pageName}</h3>
        <p>
          Obtained:{' '}
          <span className={obtainedColor}>
            {obtainedCount}/{itemCount}
          </span>
        </p>
        {killCount?.map((kc, i) => (
          <p key={`${kc.name}-log-${i}`}>
            {kc.name}: <span className='text-foreground'>{kc.amount}</span>
          </p>
        ))}
      </div>
      <div className='scroll-log grid flex-1 grid-cols-2 content-start gap-y-4 overflow-y-auto px-2 py-3 shadow-log sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
        {items.map((item, i) => (
          <Item
            key={`${item.name}-log-${i}`}
            item={item}
            showQuantity={showQuantity}
            showHover={true}
            width={50}
            height={45}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionLogItems;
