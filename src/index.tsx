import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';
import { CollectionLog, FAQ } from './routes/index';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CollectionLog />} />
        <Route path='/:username' element={<CollectionLog />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
    </BrowserRouter>
    <div id='footer'>
      <p>Oldschool RuneScape is a trademark of <a href='https://www.jagex.com/en-GB/'>Jagex Ltd.</a></p>
      <p>Images provided by <a href='https://www.osrsbox.com/'>OSRSBox</a></p>
      <p>Install the <a href='https://runelite.net/plugin-hub/show/collection-log'>Collection Log plugin</a> on <a href='https://runelite.net'>Runelite</a></p>
      <p><a href='/faq'>FAQ</a></p>
      <p>Have a problem? Submit an issue on <a href='https://github.com/evansloan/collectionlog.net/issues/new/choose'>GitHub</a></p>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
