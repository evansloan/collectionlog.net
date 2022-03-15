import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Router from './router';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
