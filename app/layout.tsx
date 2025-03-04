import React from 'react';
import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import Navbar from '@/components/navbar';
import RootProvider from '@/components/providers/root-provider';
import { GITHUB_URL, PLUGIN_URL } from '@/lib/constants';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://collectionlog.net'),
  alternates: {
    canonical: '/',
  },
  title: 'Collection Log',
  description: 'Share your OSRS Collection Log progress',
  openGraph: {
    images: ['/logo512.png'],
  },
};

export const viewport: Viewport = {
  themeColor: {
    media: '#493F35',
    color: '#FFFFFF',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='flex h-screen flex-col'>
        <div className='flex flex-1 flex-col items-center'>
          <div className='w-full md:w-10/12'>{children}</div>
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID ?? ''} />
    </html>
  );
};

export default RootLayout;
