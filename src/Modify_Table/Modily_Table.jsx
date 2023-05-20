import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./Modify_Table.css";

const ExamTable = () => {
  // set initial state with the given JSON data
  const [exams, setExams] = useState([
    {
      id: "1",
      date: "2023-06-01",
      timeSlot: "Afternoon",
      courseName: "History",
      invigilator: "John Doe",
      hall: "Hall A"
    },
    {
      id: "2",
      date: "2023-06-02",
      timeSlot: "Forenoon",
      courseName: "Mathematics",
      invigilator: "Jane Smith",
      hall: "Hall B"
    },
    {
      id: "3",
      date: "2023-06-03",
      timeSlot: "Afternoon",
      courseName: "Biology",
      invigilator: "David Lee",
      hall: "Hall C"
    }
  ]);

  // set initial state for the form fields
  const [formData, setFormData] = useState({
    id: "",
    date: "",
    timeSlot: "",
    courseName: "",
    invigilator: "",
    hall: ""
  });

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
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
  const handleAddExam = event => {
    event.preventDefault();
    setExams([...exams, formData]);
    setFormData({
      id: "",
      date: "",
      timeSlot: "",
      courseName: "",
      invigilator: "",
      hall: ""
    });
  };

  // handle deleting an exam
  const handleDeleteExam = id => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  // handle editing an exam
  const handleEditExam = (id, updatedExam) => {
    setExams(
      exams.map(exam => (exam.id === id ? { ...updatedExam } : exam))
    );
  };

  // set state for editing an exam
  const [editExam, setEditExam] = useState(null);

  // handle edit button click
  const handleEditButtonClick = exam => {
    setEditExam(exam);
    setFormData(exam);
    handleClickEditOpen();
  };


  // handle form submission for editing an exam
  const handleEditFormSubmit = event => {
    event.preventDefault();
    handleEditExam(editExam.id, formData);
    setEditExam(null);
    setFormData({
      id: "",
      date: "",
      timeSlot: "",
      courseName: "",
      invigilator: "",
      hall: ""
    });
  };

  return (
    <div className="main-card">
    <button class="button-32" role="button" onClick={handleClickAddOpen}>Add Exam</button>
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
            <tr key={exam.id}>
              <td>{exam.date}</td>
              <td>{exam.timeSlot}</td>
              <td>{exam.courseName}</td>
              <td>{exam.invigilator}</td>
              <td>{exam.hall}</td>
              <td>
                <button onClick={() => handleEditButtonClick(exam)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteExam(exam.id)}>Delete
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
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleEditFormSubmit} style={{display: "flex", flexDirection: "column"}}>
            <h2>Edit Exam</h2>
            <div>
            <label>
                Date:
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Time Slot:
                <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                >
                <option value="Forenoon">Forenoon</option>
                <option value="Afternoon">Afternoon</option>
                </select>
            </label>
            </div>
            <label>
                Course Name:
                <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Invigilator:
                <input
                type="text"
                name="invigilator"
                value={formData.invigilator}
                onChange={handleInputChange}
                />
                
            </label>
            <label>
                Hall:
                <input
                type="text"
                name="hall"
                value={formData.hall}
                onChange={handleInputChange}
                />
            </label>
            <div>
            <button type="submit" onClick={()=>{handleEditClose();}}>Save</button>
            <button type="button" onClick={() => {setEditExam(null);handleEditClose();}}>
                Cancel
            </button>
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
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
        <form onSubmit={handleAddExam} style={{display: "flex", flexDirection: "column"}}>
            <h2>Add Exam</h2>
            <div>
            <label>
                Date:
                <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Time Slot:
                <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                >
                <option value="Forenoon">Forenoon</option>
                <option value="Afternoon">Afternoon</option>
                </select>
            </label>
            </div>
            <label>
                Course Name:
                <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Invigilator:
                <input
                type="text"
                name="invigilator"
                value={formData.invigilator}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Hall:
                <input
                type="text"
                name="hall"
                value={formData.hall}
                onChange={handleInputChange}
                />
            </label>
            <div>
            <button type="submit" onClick={()=>{handleAddClose()}}>Add</button>
            </div>
            </form>
        </DialogContent>
      </Dialog>

    {/* <Button onClick={handleClickAddOpen} className="button-32">Add Exam</Button> */}

  
</div>
);
};

export default ExamTable;
