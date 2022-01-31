import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';

import Footer from './components/Footer/Footer';
import { CollectionLog, FAQ } from './routes/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CollectionLog />} />
        <Route path='/:username' element={<CollectionLog />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
