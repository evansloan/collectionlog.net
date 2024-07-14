'use client'

import React from 'react';

import LoadingProvider from '@/components/providers/loading-provider';
import ThemeProvider from '@/components/providers/theme-provider';

const RootProvider = ({ children }: { children: React.ReactNode}) => (
  <ThemeProvider>
    <LoadingProvider>
      {children}
    </LoadingProvider>
  </ThemeProvider>
);

export default RootProvider;
