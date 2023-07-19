import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Hiscores, Home, Log } from './pages';
import { Footer, Header } from './components/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
