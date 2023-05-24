import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login.jsx';
// import ResponsiveAppBar from "./FacultyAppBar.jsx"
import FacultyDashboard from './FacultyDashboard.jsx';
import AdminDashboard from './Admin_Dashboard.jsx';

function App() {  
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/facultydashboard" element={<FacultyDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
  );
}

export default App;
