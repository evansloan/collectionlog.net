import React from 'react';

import LiveStream from '@/components/home/live-stream';
import TwitchAPI from '@/lib/api/twitch/twitch-api';

const LiveStreams = async () => {
  const streams = await TwitchAPI.getInstance().getStreams();

  return (
    <div className='grid w-full grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden p-10 sm:grid-cols-3 sm:p-2 md:grid-cols-5'>
      {streams.map((stream, i) => (
        <LiveStream key={`${stream.title}-${i}`} stream={stream} />
      ))}
    </div>
  );
};

export default LiveStreams;
