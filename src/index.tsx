import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { CollectionLog, FAQ, Hiscores } from './routes/index';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CollectionLog />} />
        <Route path='/:username' element={<CollectionLog />} />
        <Route path='/:username/:entry' element={<CollectionLog />} />
        <Route path='/hiscores/:type/:page' element={<Hiscores />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
