import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CollectionLog, FAQ, Hiscores } from '@routes/index';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CollectionLog />} />
      <Route path='/:username' element={<CollectionLog />} />
      <Route path='/:username/:entry' element={<CollectionLog />} />
      <Route path='/hiscores/:type' element={<Hiscores />} />
      <Route path='/hiscores/:type/:page' element={<Hiscores />} />
      <Route path='/faq' element={<FAQ />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
