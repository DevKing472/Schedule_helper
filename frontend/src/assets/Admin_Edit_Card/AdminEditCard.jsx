import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import "./EditCardBtn.css"
// import { Grid } from '@mui/material';

export default function AdminEditCard(props) {

  const handleClick = ()=>{
    props.handlemodify();
  }

  return (
    <div style={{ marginLeft: '4%', marginTop: '5%' }}>
      <Card sx={{ maxWidth: '95%', boxShadow: '0 4px 8px #A82121' }} variant='outlined'>
        <CardContent>
          <Typography variant='h4' gutterBottom sx={{textAlign:"center"}}>
            Add or Modify The Exam Schedule
          </Typography>

          <hr style={{ color: '#A82121' }} />
          <Typography variant='h6' gutterBottom sx={{textAlign:"left"}}>
            Add a new Exam, Edit a available exam or delete a published exam from the schedule...
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>
        <button class="button-64" ><span class="text" onClick={handleClick}>Add/Delete/Edit an Exam</span></button>
      </CardActions>
      </Card>
    </div>
  );
}
