import React, { useState, useEffect } from 'react';

import './View_Schedule.css';

import data from './sample_data';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';

import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const ExamScheduleTable = () => {
  const [ scheduleData, setScheduleData ] = useState( [] );
  const [ modalShow, setModalShow ] = React.useState( false );

  useEffect( () => {
    setScheduleData( data );
  }, [] );

  function MyVerticallyCenteredModal ( props ) {
    const ExamSchema = Yup.object().shape( {
      date: Yup.date().required( "Required" ),
      time: Yup.string().required( "Required" ),
      course: Yup.string().required( "Required" ),
      invigilator: Yup.string().required( "Required" ),
      hall: Yup.string().required( "Required" ),
    } );
    const [ exams, setExams ] = useState( [] );

    const initialValues = {
      date: "",
      time: "",
      course: "",
      invigilator: "",
      hall: "",
    };

    const handleSubmit = ( values, { resetForm } ) => {
      const newExam = {
        date: values.date,
        time: values.time,
        course: values.course,
        invigilator: values.invigilator,
        hall: values.hall,
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
      if ( a.time < b.time ) {
        return -1;
      }
      if ( a.time > b.time ) {
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
      if ( a.invigilator < b.invigilator ) {
        return -1;
      }
      if ( a.invigilator > b.invigilator ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  // create function to sort the data based on hall
  const sortDataHall = () => {
    const sortedData = scheduleData.sort( ( a, b ) => {
      if ( a.hall < b.hall ) {
        return -1;
      }
      if ( a.hall > b.hall ) {
        return 1;
      }
      return 0;
    } );
    setScheduleData( [ ...sortedData ] );
  };

  return (
    <div className='schedule-container'>

      <div className='h2'>View Exam Schedule</div>

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
              <th>
                Invigilator&nbsp;
                <button onClick={ sortDataInvigilator }>
                  <FontAwesomeIcon icon={ faSort } />
                </button>
              </th>
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
                <td>{ schedule.time }</td>
                <td>{ schedule.course }</td>
                <td>{ schedule.invigilator }</td>
                <td>{ schedule.hall }</td>
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

export default ExamScheduleTable;
