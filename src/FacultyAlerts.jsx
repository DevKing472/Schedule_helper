import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import axios from 'axios';  
 
  const Table = ({ data }) => (
    <div style={{ height: '350px', overflowY: 'auto', marginTop: '10px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse',marginTop:"10px"}}>
      <thead>
        <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Date</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((alert, index) => (
          <tr key={index}>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.date}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.description}</td>
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
      })
    ).isRequired,
  };

export default function CardDemo() {

  const [alertData, setAlertData] = useState([]);

  // alertData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort the array by date in descending order

  useEffect(() => {

  async function fetchAlerts()
  {
    console.log("Recieved request for fetch alerts")
    try{
      const response = await axios.post("http://localhost:5000/fetch_faculty_alerts",{});
  
      if(response.status === 200)
      {
        let alertval = response.data.alertrecords

        alertval.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAlertData(alertval)
        
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

    fetchAlerts();
  }, []);

  return (
    <div style={{ marginLeft:'4%',marginTop: "3%" }} >
      <Card sx={{ maxWidth: '100%', boxShadow: '0 4px 8px #A82121' }} variant='outlined'>
        <CardContent>
          <Typography variant='h3' gutterBottom>
            Latest Alerts & Notifications
          </Typography>
          
          <hr style={{ color: '#A82121' }} />
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Table data={alertData} />
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Card Button</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
