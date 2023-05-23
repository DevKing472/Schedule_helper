import React, { useState, useEffect } from 'react';

import './View_Faculty_Sched.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';

// import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const FacultyScheduleTable = () => {
  const [ scheduleData, setScheduleData ] = useState( [] );
  // const [ modalShow, setModalShow ] = React.useState( false );

  const username = localStorage.getItem("UserName")

  useEffect(() => {

    async function fetchAlerts()
    {
      console.log("Recieved request for Faculty view schedule")
      try{
        const response = await axios.post("http://localhost:5000/fetch_faculty_sched",{name: username});
    
        if(response.status === 200)
        {
          let dataval = response.data.schedulerecords
  
        //   dataval.sort((a, b) => new Date(b.date) - new Date(a.date));
  
          setScheduleData( dataval )
          
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
    }, []);

  function MyVerticallyCenteredModal ( props ) {
    const ExamSchema = Yup.object().shape( {
      date: Yup.date().required( "Required" ),
      TimeSlot: Yup.string().required( "Required" ),
      course: Yup.string().required( "Required" ),
      Invigilator: Yup.string().required( "Required" ),
      Hall: Yup.string().required( "Required" ),
    } );
    const [ exams, setExams ] = useState( [] );

    const initialValues = {
      date: "",
      TimeSlot: "",
      course: "",
      Invigilator: "",
      Hall: "",
    };

    const handleSubmit = ( values, { resetForm } ) => {
      const newExam = {
        date: values.date,
        TimeSlot: values.TimeSlot,
        course: values.course,
        Invigilator: values.Invigilator,
        Hall: values.Hall,
      };
      setExams( [ ...exams, newExam ] );
      resetForm();
    };

    return (
      <Modal
        { ...props }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Exam
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="exam-name">
              <Form.Label>Exam Name</Form.Label>
              <Form.Control type="text" placeholder="Enter exam name" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exam-date">
              <Form.Label>Exam Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exam-time">
              <Form.Label>Exam Time</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-exam-time">
                  Select Time
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="forenoon">Forenoon</Dropdown.Item>
                  <Dropdown.Item eventKey="afternoon">Afternoon</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exam-duration">
              <Form.Label>Invigilator</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exam-duration">
              <Form.Label>Hall Number</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Add Exam</Button>
            <Button onClick={ props.onHide }>Close</Button>
          </Modal.Footer>
        </Form>

      </Modal>
    );
  }

  // create function to sort the data based on date
  const sortDataDate = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.date < b.date ) {
        return -1;
      }
      if ( a.date > b.date ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  // create function to sort the data based on time
  const sortDataTime = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.TimeSlot < b.TimeSlot ) {
        return -1;
      }
      if ( a.TimeSlot > b.TimeSlot ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  // create function to sort the data based on course
  const sortDataCourse = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.course < b.course ) {
        return -1;
      }
      if ( a.course > b.course ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  // create function to sort the data based on invigilator
  const sortDataInvigilator = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.Invigilator < b.Invigilator ) {
        return -1;
      }
      if ( a.Invigilator > b.Invigilator ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  // create function to sort the data based on hall
  const sortDataHall = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.Hall < b.Hall ) {
        return -1;
      }
      if ( a.Hall > b.Hall ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  return (
    <div className='schedule-container'>

      <div className='exam-schedule'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>
                Date&nbsp;
                <button onClick={ sortDataDate }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th>
              <th>
                TimeSlot&nbsp;
                <button onClick={ sortDataTime }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th>
              <th>
                Course Name&nbsp;
                <button onClick={ sortDataCourse }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th>
              {/* <th>
                Invigilator&nbsp;
                <button onClick={ sortDataInvigilator }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th> */}
              <th>
                Hall Alloted&nbsp;
                <button onClick={ sortDataHall }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            { scheduleData.map( schedule => (
              <tr key={ schedule.date }>
                <td>{ schedule.date }</td>
                <td>{ schedule.TimeSlot }</td>
                <td>{ schedule.course }</td>
                {/* <td>{ schedule.Invigilator }</td> */}
                <td>{ schedule.Hall }</td>
              </tr>
            ) ) }
          </tbody>
        </table>
      </div>

      {/* <Button variant="primary" onClick={ () => setModalShow( true ) }>
        Add Exam
      </Button>

      <MyVerticallyCenteredModal
        show={ modalShow }
        onHide={ () => setModalShow( false ) }
      /> */}
    </div>

  );
};

export default FacultyScheduleTable;
