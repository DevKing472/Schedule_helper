import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function AdminEditCard() {

  return (
    <div style={{ marginLeft: '4%', marginTop: '5%' }}>
      <Card sx={{ maxWidth: '95%', boxShadow: '0 4px 8px #A82121' }} variant='outlined'>
        <CardContent>
          <Typography variant='h4' gutterBottom>
            Your Upcoming Schedule
          </Typography>

          <hr style={{ color: '#A82121' }} />
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
