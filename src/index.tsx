import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Footer from '@components/footer/Footer';
import Header from '@components/header/Header';
import Router from './router';



ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
