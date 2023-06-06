import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./Request_Faculty.css";
import axios from "axios";

const RequestFaculty = () => {
  // set initial state with the given JSON data
  const [exams, setExams] = useState([]);

  const username = localStorage.getItem("UserName");

  const [fetchBackend,setfectchBackend] = useState(false);

  const [availablefaculty,setavailablefaculty] = React.useState([]);

  const [availablehall,setavailablehall] = React.useState([]);

  useEffect(() => {

    async function fetchAlerts()
    {
      console.log("Recieved request for fetch view schedule")
      await new Promise(resolve => setTimeout(resolve, 1000));
      // alert("hello")
      try{
        const response = await axios.post("http://localhost:5000/fetch_faculty_sched",{name: username});
    
        if(response.status === 200)
        {
          let dataval = response.data.schedulerecords
  
          dataval.sort((a, b) => new Date(b.date) - new Date(a.date));

          console.log(dataval)
  
          setExams(dataval)
          
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
    fetchAlerts();
  }, [fetchBackend]);

  // set initial state for the form fields
  const [formData, setFormData] = useState({
    _id: "",
    date: "",
    TimeSlot: "",
    course: "",
    Invigilator: "",
    Hall: "",
    Reason: "",
    src_invigilator: username
  });

  const [openEdit, setOpenEdit] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  // handle form input changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleEditButtonClick = exam => {
    // setEditExam(exam);
    exam.src_invigilator = username
    setFormData(exam);
    getAvailableData();
    handleClickEditOpen();
  };


  const EditinBackend = async()=>{
    console.log("Recieved request for fetch view schedule")
      try{
        const response = await axios.post("http://localhost:5000/request_faculty",{"formdata": formData});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Requested the faculty for a swap")
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
        const response = await axios.post("http://localhost:5000/fetch_available",{"date": formData.date,"TimeSlot": formData.TimeSlot,"_id": formData._id});
    
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

  // handle form submission for editing an exam
  const handleEditFormSubmit = event => 
  {
    event.preventDefault();
    //formData contains all the edited details edit the final details and call the useEffect function here.
    // handleEditExam(editExam._id, formData);
    EditinBackend();
    setfectchBackend(!fetchBackend);
    // setEditExam(null);
    setFormData({
      _id: "",
      date: "",
      TimeSlot: "",
      course: "",
      Invigilator: "",
      Hall: "",
      Reason:"",
      src_invigilator: username
    });
  };

  return (
    <div style={{display: "flex",width: "100%",flexDirection:"row",justifyItems:"center"}}>
    <div className="Request-Card" sx={{width: "75%"}}>
    {/* <button class="button-32" onClick={handleClickAddOpen}>Add Exam</button> */}
    <h2>Request the Exam you want to Swap with Another Faculty</h2>
    <br/>
    <br/>
      <table className="RequestTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Course Name</th>
            {/* <th>Invigilator</th> */}
            <th>Hall</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam._id}>
              <td>{exam.date}</td>
              <td>{exam.TimeSlot}</td>
              <td>{exam.course}</td>
              {/* <td>{exam.Invigilator}</td> */}
              <td>{exam.Hall}</td>
              <td>
                <button onClick={() => handleEditButtonClick(exam)}>
                  Request
                </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <Dialog
        fullScreen={fullScreen}
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}>
          <h1>Request Faculty</h1>
          <br/>
          <h5 sx={{color:"darkgrey"}}>Request other faculties who are avaiable at that timeframe</h5>
              <br/>
              <div>
              <br/>
              <label>
                  <b> Alternate Invigilator:</b>
                  <select
                  name="Invigilator"
                  value={formData.Invigilator}
                  onChange={handleInputChange}
                  style={{
                    width: '350px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                  >
                  {/* <option value={formData.Hall}>{formData.Hall}</option> */}
                  {availablefaculty.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
                  
              </label>
              <br/>
              <br/>
              <label>
                  <b>Reason for Alternate Request: </b>
                  <textarea
                  name="Reason"
                  value={formData.Reason}
                  onChange={handleInputChange}
                  style={{width: "350px",height:"100px",fontSize:"15px"}}
                  /> 

              </label>
              </div>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleEditClose();}}>Request</button>
            <button type="button" onClick={() => {handleEditClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* <Dialog
        fullScreen={fullScreen}
        open={openEditSecond}
        onClose={handleEditSecondClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}> {/*onSubmit={handleEditFormSubmit} */}
          {/* <h1>Suggest Details</h1>
          <br/>
          <h5>Enter Your Suggested Hall,Course Change and you Reason for the change</h5>
              <br/>
              <br/>
              <label>
                  <b>Course Name: </b>
                  <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  style={{width: "350px"}}
                  /> 
              </label>
              <br/>
              <label>
                  <b>Hall:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <select
                  name="Hall"
                  value={formData.Hall}
                  onChange={handleInputChange}
                  style={{
                    width: '350px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px'
                  }}
                  >
                  {/* <option value={formData.Hall}>{formData.Hall}</option> */}
                  {/* {availablehall.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
                  
              </label>
              <br/>
              <label>
                  <b>Reason for Reschedule Suggestion: </b>
                  <textarea
                  name="Reason"
                  value={formData.Reason}
                  onChange={handleInputChange}
                  style={{width: "350px",height:"100px",fontSize:"15px"}}
                  /> 

              </label>
              <br/>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleEditSecondClose();}}>Request</button>
            <button type="button" onClick={() => {handleEditSecondClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog> */}
  
</div>
</div>
);
};

export default RequestFaculty;
