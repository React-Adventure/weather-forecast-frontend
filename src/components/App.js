import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import '../styles/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;