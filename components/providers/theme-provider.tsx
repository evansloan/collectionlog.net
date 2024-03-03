'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider as TP } from 'next-themes';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => <TP attribute='class'>{children}</TP>;

export default ThemeProvider;
