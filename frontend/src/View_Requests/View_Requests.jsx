import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import "./View_Requests.css"
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import axios from 'axios'; 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function ViewRequest(props) {

  const [requestData, setrequestData] = useState([]);
  const [fetchBackend,setfectchBackend] = useState(false);

  const username = localStorage.getItem("UserName")
  

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
    remarks: "",
    src_invigilator:""
  });

  // const [oldValue,setoldValue] = useState({
  //   _id: "",
  //   date: "",
  //   TimeSlot: "",
  //   course: "",
  //   Invigilator: "",
  //   Hall: ""
  // })

  const [openEdit, setOpenEdit] = React.useState(false);
  // const [openEditSecond, setOpenEditSecond] = React.useState(false);

  // const [availablefaculty,setavailablefaculty] = React.useState([]);

  // const [availablehall,setavailablehall] = React.useState([]);

  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  }

  // async function fetchOldValues(rowid)
  // {
  //   try{
  //     const response = await axios.post("http://localhost:5000/fetch_old_values",{_id: rowid});
  
  //     if(response.status === 200)
  //     {
  //       let alertval = response.data.oldvalue;

  //       setoldValue(alertval)
  //     }
  //     else if(response.status === 404)
  //     {
        
  //     }
  //     else{
  //       // alert("Cannot Connect with Server")
  //       return;
  //     }
  
  //     }
  //     catch(e)
  //     {
  //       // alert(e)
  //     }
  // }

  const handleInputChange = event => {
    const { name, value } = event.target;
    seteditdata({ ...editdata, [name]: value });
  };

  const handleView = async (event)=>{
    seteditdata(event);  
    // await fetchOldValues(event.rowid);
    handleClickEditOpen();
  }

  useEffect(() => {

  async function fetchAlerts()
  {
    console.log("Recieved request for fetch requests")
    try{
      const response = await axios.post("http://localhost:5000/fetch_faculty_requests",{name: username});
  
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
        const response = await axios.post("http://localhost:5000/accept_faculty_request",{"formdata": editdata});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Swapped Exams Successfully!")
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
        const response = await axios.post("http://localhost:5000/reject_faculty_request",{"formdata": editdata});
    
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

  // const getAvailableData = async()=>{
  //   console.log("Recieved request for fetch avaiable options")
  //     try{
  //       const response = await axios.post("http://localhost:5000/fetch_available",{"date": editdata.date,"TimeSlot": editdata.TimeSlot,"_id": editdata.rowid});
    
  //       if(response.status === 200)
  //       {
  //           let facultyarr = response.data.Invigilators;
  //           let hallarr = response.data.Halls;

  //           console.log(facultyarr)

  //           console.log(hallarr)

  //           setavailablefaculty(facultyarr);
  //           setavailablehall(hallarr);
  //       }
  //       else if(response.status === 404)
  //       {
          
  //       }
  //       else{
  //         // alert("Cannot Connect with Server")
  //         return;
  //       }
    
  //       }
  //       catch(e)
  //       {
  //         alert(e)
  //       }
  // }

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
      remarks: "",
      src_invigilator:""
    });
    // setoldValue({
    //   _id: "",
    //   date: "",
    //   TimeSlot: "",
    //   course: "",
    //   Invigilator: "",
    //   Hall: ""
    // });
  };

  const handleEditDateSubmit = event =>{
    //connect to backend to get options then call to open the other dialog
    event.preventDefault();
    // getAvailableData();
    // handleClickEditSecondOpen();
  }

  const handleReject = async() => {
    //TODO add code in backend to delete this row in backend and refresh the page
    await RejectRequest();
    handleEditClose();
  }

  const Table = ({ data }) => (
    <div style={{overflowY: 'auto', marginTop: '10px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse',marginTop:"10px"}}>
      <thead>
        <tr style={{ backgroundColor: '#A82121', color: '#FFF' }}>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center', width: '25%' }}>Request Time</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Date</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>TimeSlot</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Course Name</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Invigilator</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}>Hall</th>
          <th style={{ padding: '10px', border: '1px solid #FFF', textAlign: 'center' }}></th>

        </tr>
      </thead>
      <tbody>
        {data.map((alert, index) => (
          <tr key={index}>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center', width: '25%' }}>{alert.reqdate}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.date}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.TimeSlot}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.course}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.src_invigilator}</td>
            <td style={{ padding: '10px', border: '1px solid #CCC', textAlign: 'center' }}>{alert.Hall}</td>
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
    <div style={{ marginLeft: '4%', marginTop: '3%'}}>
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

            <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}> {/*onSubmit={handleEditFormSubmit} */}
          <h1>Swap Request</h1>
              <br/>
              <br/>
              <label>
              <b>Reason for Request: </b>
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
              <br/>
              <label>
              <b>Remarks for {editdata.src_invigilator}: </b>
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
