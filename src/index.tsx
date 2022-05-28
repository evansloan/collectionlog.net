import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Footer from '@components/footer/Footer';
import Header from '@components/header/Header';
import Router from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <Router />
      <Footer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
