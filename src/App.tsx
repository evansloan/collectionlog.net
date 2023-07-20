import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { Hiscores, Home, Log } from './pages';
import { Footer, Header } from './components/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60,
      staleTime: 1000 * 60,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.sessionStorage,
});

const App = () => (
  <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }} >
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/log/:username' element={<Log />} />
        <Route path='/log/:username/:pageName' element={<Log />} />
        <Route path='/hiscores' element={<Hiscores />} />
        <Route path='/hiscores/:page' element={<Hiscores />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </PersistQueryClientProvider>
);

export default App;
