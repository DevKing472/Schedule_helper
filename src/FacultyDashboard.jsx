import * as React from 'react';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './FacultyAppBar';
import CardDemo  from './FacultyAlerts';
import FacultySchedule from './FacultySchedule';

function FacultyDashboard() {

    const username = localStorage.getItem("UserName")
  
  return (
    // <div>
    //     <ResponsiveAppBar />
    //     <CardDemo/>
    //     <FacultySchedule/>
    // </div>
    <div>
      <ResponsiveAppBar />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 6 }}>
          <CardDemo />
        </div>
        <div style={{ flex: 4 }}>
          <FacultySchedule />
        </div>
      </div>
    </div>
  );
}
export default FacultyDashboard;
