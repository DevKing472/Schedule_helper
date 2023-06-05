import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import axios from 'axios';


const alertData = [
  { date: '2023-05-14', course: 'Alert description 1', hall: 'Hall A' },
  { date: '2023-05-15', course: 'Alert description 2', hall: 'Hall B' },
  { date: '2023-04-16', course: 'Alert description 3', hall: 'Hall C' },
];

alertData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort the array by date in descending order

const Table = ({ data }) => (
  <div style={{ height: '350px', overflowY: 'auto', marginTop: '10px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: "10px" }}>
      <thead>
        <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Date</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Course Name</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Hall Allotted</th>
        </tr>
      </thead>
      <tbody>
        {data.map((alert, index) => (
          <tr key={index}>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.date}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.course}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.Hall}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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

  const username = localStorage.getItem("UserName")

  const [scheduleData, setScheduleData] = useState([]);


  useEffect(() => {

    async function fetchSchedule(username)
    {
      console.log("Recieved request for fetch alerts")
      try{
        const response = await axios.post("http://localhost:5000/fetch_faculty_sched",{name: username});
    
        if(response.status === 200)
        {
          let schedval = response.data.schedulerecords

          schedval.sort((a, b) => new Date(b.date) - new Date(a.date));

          setScheduleData(schedval)
        }
        else if(response.status === 404)
        {
          
        }
        else{
          // alert("Cannot Connect with Server")
          return;
        }
    
        }
        catch(e)
        {
          // alert(e)
        }
  
        console.log(JSON.stringify(alertData))
    }
  
      fetchSchedule(username);
    }, []);

  return (
    <div style={{ marginLeft: '4%', marginTop: '5%' }}>
      <Card sx={{ maxWidth: '95%', boxShadow: '0 4px 8px #A82121',height: "325px"}} variant='outlined'>
        <CardContent>
          <Typography variant='h4' gutterBottom>
            Your Upcoming Schedule
          </Typography>

          <hr style={{ color: '#A82121' }} />
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              { scheduleData.length != 0 &&
              <Table data={scheduleData} />
              }
              { scheduleData.length == 0 &&
              <div style={{textAlign:"center",marginTop: "10px",fontSize:"20px"}}>You Have No Upcoming Schedule</div>
              }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
