import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import AnalyticsService from './services/analytics';

import './index.scss';

AnalyticsService.useAnalytics();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <App />
);
