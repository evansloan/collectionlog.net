import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Hiscores, Home, CollectionLog } from './pages';
import { Footer, Header } from './components/layout';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/log/:username' element={<CollectionLog />} />
      <Route path='/log/:username/:entry' element={<CollectionLog />} />
      <Route path='/hiscores' element={<Hiscores />} />
      <Route path='/hiscores/:page' element={<Hiscores />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
