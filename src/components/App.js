import React from 'react';
import { HashRouter , Route, Routes } from 'react-router-dom';

import Home from './Home';

const App = () => {
  return (
    <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>
    </HashRouter >
  );
};

export default App;