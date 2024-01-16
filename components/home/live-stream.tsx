'use client';

import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LiveStreamProps {
  stream: Stream;
}

const LiveStream = ({ stream }: LiveStreamProps) => {
  return (
    <a
      href={`https://twitch.tv/${stream.user_name}`}
      className='border-2 no-underline hover:bg-accent'
    >
      <div className='text-center'>
        <img
          className='m-auto w-full'
          src={stream.thumbnail_url
            .replace(/{width}/g, '320')
            .replace(/{height}/g, '180')}
          alt={`${stream.title} thumbnail`}
        />
        <div className='p-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-foreground'>
                  {stream.title}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stream.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p>{stream.user_name}</p>
        </div>
      </div>
    </a>
  );
};

export default LiveStream;
