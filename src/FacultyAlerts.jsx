import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const alertData = [
    { date: '2023-05-14', description: 'Alert description 1' },
    { date: '2023-05-15', description: 'Alert description 2' },
    { date: '2023-04-16', description: 'Alert description 3' },
  ];

  alertData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort the array by date in descending order


export default function CardDemo() {
  return (
    <div style={{ marginLeft:'4%',marginTop: "2%" }}>
      <Card sx={{ maxWidth: '65%', boxShadow: '0 4px 8px #A82121' }} variant='outlined'>
        <CardContent>
          <Typography variant='h3' gutterBottom>
            Latest Alerts & Notifications
          </Typography>
          
          <hr style={{ color: '#A82121' }} />
          <table style={{ width: '100%', borderCollapse: 'collapse',marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
                <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {alertData.map((alert, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.date}</td>
                  <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Card Button</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
