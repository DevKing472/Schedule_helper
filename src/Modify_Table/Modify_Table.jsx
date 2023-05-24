import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./Modify_Table.css";
import axios from "axios";

const ExamTable = () => {
  // set initial state with the given JSON data
  const [exams, setExams] = useState([]);
  //   {
  //     id: "1",
  //     date: "2023-06-01",
  //     TimeSlot: "Afternoon",
  //     course: "History",
  //     Invigilator: "John Doe",
  //     Hall: "Hall A"
  //   },
  //   {
  //     _id: "2",
  //     date: "2023-06-02",
  //     TimeSlot: "Forenoon",
  //     course: "Mathematics",
  //     Invigilator: "Jane Smith",
  //     Hall: "Hall B"
  //   },
  //   {
  //     _id: "3",
  //     date: "2023-06-03",
  //     TimeSlot: "Afternoon",
  //     course: "Biology",
  //     Invigilator: "Dav_id Lee",
  //     Hall: "Hall C"
  //   }
  // ]);

  const [fetchBackend,setfectchBackend] = useState(false);
  
  const [deleterow,setdeleterow] = useState("");

  const [deletedialog, setdeletedialog] = React.useState(false);

  const [availablefaculty,setavailablefaculty] = React.useState([]);

  const [availablehall,setavailablehall] = React.useState([]);



  useEffect(() => {

    async function fetchAlerts()
    {
      console.log("Recieved request for fetch view schedule")
      await new Promise(resolve => setTimeout(resolve, 1000));
      // alert("hello")
      try{
        const response = await axios.post("http://localhost:5000/fetch_view_table",{});
    
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
    Hall: ""
  });

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditSecond, setOpenEditSecond] = React.useState(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAddSecond,setOpenAddSecond] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleClickEditSecondOpen = () => {
    setOpenEditSecond(true);
  };

  const handleEditSecondClose = () => {
    setOpenEditSecond(false);
  };

  const handleClickAddSecondOpen = () => {
    setOpenAddSecond(true);
  };

  const handleAddSecondClose = () => {
    setOpenAddSecond(false);
  };

  const handleClickAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  // handle form input changes
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle adding a new exam
  // const handleAddExam = event => {
  //   event.preventDefault();
  //   setExams([...exams, formData]);
  //   setFormData({
  //     _id: "",
  //     date: "",
  //     TimeSlot: "",
  //     course: "",
  //     Invigilator: "",
  //     Hall: ""
  //   });
  // };

  // handle deleting an exam
  const handleDeleteExam = _id => 
  {
      handleDeleteOpen(true);
      setdeleterow(_id);
  };

  // handle editing an exam
  // const handleEditExam = (_id, updatedExam) => {
  //   setExams(
  //     exams.map(exam => (exam._id === _id ? { ...updatedExam } : exam))
  //   );
  // };

  // set state for editing an exam
  // const [editExam, setEditExam] = useState(null);

  // handle edit button click
  const handleEditButtonClick = exam => {
    // setEditExam(exam);
    setFormData(exam);
    handleClickEditOpen();
  };

  const handleDeleteClose = ()=>{
    setdeletedialog(false);
  }

  const handleDeleteOpen = ()=>{
    setdeletedialog(true);
  }

  const AddinBackend = async()=>{
    console.log("Recieved request for adding exam")
      try{
        const response = await axios.post("http://localhost:5000/add_exam",{"formdata": formData});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Added the Exam successfully!")
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

  const EditinBackend = async()=>{
    console.log("Recieved request for fetch view schedule")
      try{
        const response = await axios.post("http://localhost:5000/edit_exam",{"formdata": formData});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Edited the Exam successfully!")
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

  const DeleteinBackend = async()=>{
    console.log("Recieved request for delete a exam")
      try{
        const response = await axios.post("http://localhost:5000/delete_exam",{"_id": deleterow});
    
        if(response.status === 200)
        {
            //mostly do nothing
            alert("Deleted the Exam Succesfully")
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
      handleDeleteClose();
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
      Hall: ""
    });
  };

  const handleEditDateSubmit = event =>{
      //connect to backend to get options then call to open the other dialog
      event.preventDefault();
      getAvailableData();
      handleClickEditSecondOpen();

  }

  const handleAddDateSubmit = event =>{
      event.preventDefault();
      getAvailableData();
      handleClickAddSecondOpen();
  }

  const handleAddFormSubmit = event => 
  {
    event.preventDefault();
    //formData contains all the edited details edit the final details and call the useEffect function here.
    // handleEditExam(editExam._id, formData);
    AddinBackend();
    setfectchBackend(!fetchBackend);
    // setEditExam(null);
    setFormData({
      _id: "",
      date: "",
      TimeSlot: "",
      course: "",
      Invigilator: "",
      Hall: ""
    });
  };

  return (
    <div className="main-card">
    <button class="button-32" onClick={handleClickAddOpen}>Add Exam</button>
    <br/>
    <br/>
      <table className="ModifyTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Course Name</th>
            <th>Invigilator</th>
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
              <td>{exam.Invigilator}</td>
              <td>{exam.Hall}</td>
              <td>
                <button onClick={() => handleEditButtonClick(exam)}>
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button onClick={() => handleDeleteExam(exam._id)}>
                  <i class="fa fa-trash" aria-hidden="true"></i>
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
        <form onSubmit={handleEditDateSubmit} style={{display: "flex", flexDirection: "column"}}>
          <h1>Edit Exam</h1>
              <br/>
              <div>
              <label style={{marginRight: "25px",fontSize: "20px"}}>
                  <b>Date: </b>
                  <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px',
                  }}
                  />
              </label>
              <br/>
              <br/>
              <label style={{marginRight: "25px",fontSize: "20px"}}>
                  <b>Time: </b>
                  <select
                  name="TimeSlot"
                  value={formData.TimeSlot}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px',
                  }}
                  >
                  <option value="FN">Forenoon</option>
                  <option value="AN">Afternoon</option>
                  </select>
              </label>
              </div>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleEditClose();}}>Next</button>
            <button type="button" onClick={() => {handleEditClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openEditSecond}
        onClose={handleEditSecondClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}> {/*onSubmit={handleEditFormSubmit} */}
          <h1>Edit Exam</h1>
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
                  <b>Invigilator: </b>
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
                  {availablehall.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
                  
              </label>
              <br/>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleEditSecondClose();}}>Edit</button>
            <button type="button" onClick={() => {handleEditSecondClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openAdd}
        onClose={handleAddClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleAddDateSubmit} style={{display: "flex", flexDirection: "column"}}>
          <h1>Add Exam</h1>
              <br/>
              <div>
              <label style={{marginRight: "25px",fontSize: "20px"}}>
                  <b>Date: </b>
                  <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px',
                  }}
                  />
              </label>
              <br/>
              <br/>
              <label style={{marginRight: "25px",fontSize: "20px"}}>
                  <b>Time: </b>
                  <select
                  name="TimeSlot"
                  value={formData.TimeSlot}
                  onChange={handleInputChange}
                  style={{
                    width: '300px',
                    height: '40px',
                    fontSize: '18px',
                    padding: '5px',
                  }}
                  >
                  <option value="">--Select--</option>
                  <option value="FN">Forenoon</option>
                  <option value="AN">Afternoon</option>
                  </select>
              </label>
              </div>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleAddClose();}}>Next</button>
            <button type="button" onClick={() => {handleAddClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openAddSecond}
        onClose={handleAddSecondClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleAddFormSubmit} style={{display: "flex", flexDirection: "column"}}> {/*onSubmit={handleEditFormSubmit} */}
          <h1>Add Exam</h1>
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
                  <b>Invigilator: </b>
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
                  <option value="">--Select--</option>
                  {availablefaculty.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
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
                    <option value="">--Select--</option>
                  {availablehall.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  </select>
                  
              </label>
              <br/>
              <br/>
            <div>
            <button type="submit" onClick={()=>{handleAddSecondClose();}}>Add</button>
            <button type="button" onClick={() => {handleAddSecondClose();}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>


      {/* <Dialog
        fullScreen={fullScreen}
        open={openAdd}
        onClose={handleAddClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <form onSubmit={handleAddFormSubmit} style={{display: "flex", flexDirection: "column"}}>
            <h1>Add Exam</h1>
            <br/>
            <div>
            <label style={{marginRight: "25px"}}>
                <b>Date: </b>
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                />
            </label>
            <label>
                <b>Time Slot: </b>
                <select
                name="TimeSlot"
                value={formData.TimeSlot}
                onChange={handleInputChange}
                >
                <option value="FN">Forenoon</option>
                <option value="AN">Afternoon</option>
                </select>
            </label>
            </div>
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
                <b>Invigilator: </b>
                <input
                type="text"
                name="Invigilator"
                value={formData.Invigilator}
                onChange={handleInputChange}
                style={{width: "350px"}}
                />
            </label>
            <br/>
            <label>
                <b>Hall: </b>
                <input
                type="text"
                name="Hall"
                value={formData.Hall}
                onChange={handleInputChange}
                style={{width: "360px"}}
                />
            </label>
            <div>
            <button type="submit" onClick={()=>{handleAddClose()}}>Add</button>
            <button type="button" onClick={()=>{handleAddClose()}}>Cancel</button>
            </div>
            </form>
        </DialogContent>
      </Dialog> */}

      <Dialog
        open={deletedialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this Exam?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once Deleted this Exam's data will be lost and cannot be recovered later!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={DeleteinBackend} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

  
</div>
);
};

export default ExamTable;
