import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login.jsx';
import ResponsiveAppBar from "./Dashboard.jsx"

function App() {  
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ResponsiveAppBar />} />
      </Routes>
  );
}

export default App;
