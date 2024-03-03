import React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import Navbar from '@/components/navbar';
import { GITHUB_URL, PLUGIN_URL } from '@/lib/constants';

import './globals.css';

export const metadata: Metadata = {
  title: 'Collection Log',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className='flex h-screen flex-col'>
        <Navbar />
        <div className='flex flex-1 flex-col items-center'>
          <div className='w-full md:w-10/12'>{children}</div>
        </div>
        <footer className='bottom-0 mt-2.5 w-full border-t-4 border-t-black bg-card p-2 shadow-log'>
          <div className='flex flex-wrap justify-around text-center text-sm'>
            <p>
              Oldschool Runescape is a trademark of{' '}
              <a href='https://www.jagex.com/en-GB/'>Jagex Ltd.</a>
            </p>
            <p>
              Install the <a href={PLUGIN_URL}>Collection Log plugin</a> on{' '}
              <a href='https://runelite.net'>RuneLite</a>
            </p>
            <p>
              Have a problem or found a bug? Submit an issue on{' '}
              <a href={GITHUB_URL + '/issues/new/choose'}>GitHub</a>
            </p>
          </div>
        </footer>
      </body>
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID ?? ''} />
    </html>
  );
};

export default RootLayout;
