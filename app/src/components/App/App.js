
import React from 'react';
import '../../css/style.css';
import '../../css/tabler.css';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from '../Routes';

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;
