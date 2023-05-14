import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';


const alertData = [
  { date: '2023-05-14', course: 'Alert description 1', hall: 'Hall A' },
  { date: '2023-05-15', course: 'Alert description 2', hall: 'Hall B' },
  { date: '2023-04-16', course: 'Alert description 3', hall: 'Hall C' },
];

alertData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort the array by date in descending order

const Table = ({ data }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: "10px" }}>
    <thead>
      <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
        <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Date</th>
        <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Description</th>
        <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Hall Allotted</th>
      </tr>
    </thead>
    <tbody>
      {data.map((alert, index) => (
        <tr key={index}>
          <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.date}</td>
          <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.course}</td>
          <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.hall}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      hall: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default function FacultySchedule() {
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
              <Table data={alertData} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
