import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import "./Admin_View_Request.css"
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import axios from 'axios'; 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function AdminEditCard(props) {

  const [requestData, setrequestData] = useState([]);
  const [fetchBackend,setfectchBackend] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const [editdata,seteditdata] = useState({
    _id: "",
    date: "",
    TimeSlot: "",
    course: "",
    Invigilator: "",
    Hall: "",
    rowid: "",
    Reason: "",
    reqdate: "",
    remarks: ""
  });

  const [oldValue,setoldValue] = useState({
    _id: "",
    date: "",
    TimeSlot: "",
    course: "",
    Invigilator: "",
    Hall: ""
  })

  const [openEdit, setOpenEdit] = React.useState(false);
  // const [openEditSecond, setOpenEditSecond] = React.useState(false);

  const [availablefaculty,setavailablefaculty] = React.useState([]);

  const [availablehall,setavailablehall] = React.useState([]);

  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  }

  async function fetchOldValues(rowid)
  {
    try{
      const response = await axios.post("http://localhost:5000/fetch_old_values",{_id: rowid});
  
      if(response.status === 200)
      {
        let alertval = response.data.oldvalue;

        setoldValue(alertval)
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
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    seteditdata({ ...editdata, [name]: value });
  };

  const handleView = async (event)=>{
    seteditdata(event);  
    await fetchOldValues(event.rowid);
    handleClickEditOpen();
  }

  useEffect(() => {

  async function fetchAlerts()
  {
    console.log("Recieved request for fetch requests")
    try{
      const response = await axios.post("http://localhost:5000/fetch_admin_requests",{});
  
      if(response.status === 200)
      {
        let alertval = response.data.requestrecords

        alertval.sort((a, b) => new Date(b.reqdate) - new Date(a.reqdate));

        setrequestData(alertval)
        
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
  }

    fetchAlerts();
  }, [fetchBackend]);

  const EditinBackend = async()=>{
    console.log("Recieved request for fetch view schedule")
      try{
        const response = await axios.post("http://localhost:5000/accept_request",{"formdata": editdata});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Edited the Exam successfully!")
            setfectchBackend(!fetchBackend);
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
          alert(e)
        }
  }

  const RejectRequest = async()=>{
    console.log("Recieved request for rejecting request")
      try{
        const response = await axios.post("http://localhost:5000/reject_request",{"formdata": editdata});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Rejected the Request!")
            setfectchBackend(!fetchBackend);
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
          alert(e)
        }
  }

  const getAvailableData = async()=>{
    console.log("Recieved request for fetch avaiable options")
      try{
        const response = await axios.post("http://localhost:5000/fetch_available",{"date": editdata.date,"TimeSlot": editdata.TimeSlot,"_id": editdata.rowid});
    
        if(response.status === 200)
        {
            let facultyarr = response.data.Invigilators;
            let hallarr = response.data.Halls;

            console.log(facultyarr)

            console.log(hallarr)

            setavailablefaculty(facultyarr);
            setavailablehall(hallarr);
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
          alert(e)
        }
  }

  const handleEditFormSubmit = event => 
  {
    event.preventDefault();
    //formData contains all the edited details edit the final details and call the useEffect function here.
    // handleEditExam(editExam._id, formData);
    EditinBackend();
    // setfectchBackend(!fetchBackend);
    // setEditExam(null);
    seteditdata({
      _id: "",
      date: "",
      TimeSlot: "",
      course: "",
      Invigilator: "",
      Hall: "",
      rowid: "",
      Reason: "",
      reqdate: "",
      remarks: ""
    });
    setoldValue({
      _id: "",
      date: "",
      TimeSlot: "",
      course: "",
      Invigilator: "",
      Hall: ""
    });
  };

  const handleEditDateSubmit = event =>{
    //connect to backend to get options then call to open the other dialog
    event.preventDefault();
    getAvailableData();
    // handleClickEditSecondOpen();
  }

  const handleReject = async() => {
    //TODO add code in backend to delete this row in backend and refresh the page
    await RejectRequest();
    handleEditClose();
  }

  const Table = ({ data }) => (
    <div style={{ height: '320px', overflowY: 'auto', marginTop: '10px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse',marginTop:"10px"}}>
      <thead>
        <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Request Time</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Description</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((alert, index) => (
          <tr key={index}>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.reqdate}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.course+" requested for a reschedule by "+alert.Invigilator}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}> 
              <button onClick={() => handleView(alert)}>View</button>
            </td>
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

  return (
    <div style={{ marginLeft: '4%', marginTop: '3%',height:"700px" }}>
      <Card sx={{ maxWidth: '95%', boxShadow: '0 4px 8px #A82121' }} variant='outlined'>
        <CardContent>
          <Typography variant='h4' gutterBottom sx={{textAlign:"left"}}>
            Exam Reschedule Requests
          </Typography>
          <hr style={{ color: '#A82121' }} />
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Table data={requestData} />
            </Grid>
          </Grid>
        </CardContent>
        
      </Card>

      <Dialog
        fullScreen={fullScreen}
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent sx={{width:"500px"}}>
        <form onSubmit={handleEditDateSubmit} style={{display: "flex", flexDirection: "column"}}>
          <h2>Reschedule Request</h2>
              <br/>
              <div>
              <label style={{marginRight: "25px",fontSize: "18px"}}>
                  <b>Current Date:</b> {oldValue.date}<br/>
                  <b>Suggested Date: </b>
                  <input
                  type="date"
                  name="date"
                  value={editdata.date}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                  />
              </label>
              <br/>
              <br/>
              <br/>
              <label style={{marginRight: "25px",fontSize: "18px"}}>
                  <b>Current TimeSlot:</b> {oldValue.TimeSlot}<br/>
                  <b>TimeSlot: </b>
                  <select
                  name="TimeSlot"
                  value={editdata.TimeSlot}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px',
                    paddingTop:"10px"
                  }}
                  >
                  <option value="FN">Forenoon</option>
                  <option value="AN">Afternoon</option>
                  </select>
              </label>
              </div>
              <br/>
            <div>
            <button type="submit">Get Available Faculties, Halls</button>
            </div>
            </form>

            <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}> {/*onSubmit={handleEditFormSubmit} */}
          {/* <h1>Edit Exam</h1> */}
              <br/>
              <br/>
              <label>
                  <b>Current Course Name:</b> {oldValue.course}<br/>
                  <b>Course Name: </b>
                  <input
                  type="text"
                  name="course"
                  value={editdata.course}
                  onChange={handleInputChange}
                  style={{width: "350px"}}
                  /> 

              </label>
              <br/>
              <label>
                  <b>Current Invigilator:</b> {oldValue.Invigilator}<br/>
                  <b>Invigilator: </b>
                  <select
                  name="Invigilator"
                  value={editdata.Invigilator}
                  onChange={handleInputChange}
                  style={{
                    width: '350px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                  >
                    {/* <option value={formData.Invigilator}>{formData.Invigilator}</option> */}
                  {availablefaculty.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
              </label>
              <br/>
              <label>
                  <b>Current Hall:</b> {oldValue.Hall}<br/>
                  <b>Hall:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <select
                  name="Hall"
                  value={editdata.Hall}
                  onChange={handleInputChange}
                  style={{
                    width: '350px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                  >
                  {/* <option value={formData.Hall}>{formData.Hall}</option> */}
                  {availablehall.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
                  
              </label>
              <br/>
              <br/>
              <label>
              <b>Reason: </b>
              <textarea
                  name="Reason"
                  value={editdata.Reason}
                  onChange={handleInputChange}
                  style={{width: "350px",height:"100px",fontSize:"15px"}}
                  disabled
                  />
              </label>
              <br/>
              <br/>
              <label>
              <b>Remarks for the faculty: </b>
              <textarea
                  name="remarks"
                  value={editdata.remarks}
                  onChange={handleInputChange}
                  style={{width: "350px",height:"100px",fontSize:"15px"}}
                  />
              </label>
            <div>
            <button type="submit" onClick={()=>{handleEditClose();}}>Accept</button>
            <button type="button" onClick={() => {handleReject();}}>Reject</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>
       
    </div>
  );
}
