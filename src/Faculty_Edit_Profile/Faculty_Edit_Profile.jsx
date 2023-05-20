import React, { useState,useEffect } from "react";
import './Faculty_Edit_Profile.css';
import axios from 'axios';


const Faculty_Edit_Profile = () => {

    const [ProfileData,setProfileData] = useState({})//useState({"fname":"Pradeep","lname":"Karthik M","email": "cb.en.u4cse20447@cb.students.amrita.edu","mobile":"8825824693","designation":"Professor","department":"CSE","email_sub":"yes"});

    const email_id = localStorage.getItem("UserEmail")

  const [firstName, setFirstName] = useState(ProfileData.fname);
  const [lastName, setLastName] = useState(ProfileData.lname);
  const [email, setEmail] = useState(ProfileData.email);
  const [phone, setPhone] = useState(ProfileData.mobile);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState(ProfileData.designation);
  const [department, setDepartment] = useState(ProfileData.department);
  const [emailNotifications, setEmailNotifications] = useState(ProfileData.email_sub);
  const [updatedValues, setUpdatedValues] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {

    async function fetchProfile()
    {
      console.log("Recieved request for facult edit profile")
      try{
        const response = await axios.post("http://localhost:5000/fetch_edit_profile",{email: email_id});
    
        if(response.status === 200)
        {
          let alertval = response.data.editrecords

          setProfileData(alertval)
          setFirstName(alertval.fname)
          setLastName(alertval.lname)
          setEmail(alertval.email)
          setPhone(alertval.mobile)
          setDesignation(alertval.designation)
          setDepartment(alertval.department)
          setEmailNotifications(alertval.email_sub)
          
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
  
      fetchProfile();
    }, []);


  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handlenotificationsetter = (e) => {
    setEmailNotifications(true);
  };

  const handlenotificationunsetter = (e) => {
    setEmailNotifications(false);
  };

  const validateForm = ()=>
  {
    if(phone.length != 10)
    {
        alert("Fill 10 digits in Phone Number")
        return false
    }
    else if(newPassword.length != 0 && confirmPassword.length != 0)
    {
        if(newPassword != confirmPassword)
        {
            alert("Make sure that Passwordis same in both fields")
            return false 
        }
        else if(newPassword.length<6)
        {
            alert("Password should be atleast 6 characters long")
            return false
        }
    }
    return true
  }

  const send_backend = async (modifiedValues)=> {


    const tosend = {
        fname: modifiedValues.firstName,
        lname: modifiedValues.lastName,
        email: modifiedValues.email,
        mobile: modifiedValues.phone,
        password: modifiedValues.newPassword,
        designation: modifiedValues.designation,
        department: modifiedValues.department,
        email_sub: modifiedValues.emailNotifications

    }

    console.log("Recieved request for facult edit profile")
      try{
        const response = await axios.post("http://localhost:5000/update_edit_profile",tosend);
    
        if(response.status === 200)
        {
          alert("User Profile Updated") 
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifiedValues = {
      firstName,
      lastName,
      email,
      phone,
      newPassword,
      confirmPassword,
      designation,
      department,
      emailNotifications,
    };
    setUpdatedValues(modifiedValues);
    setFirstName(modifiedValues.firstName);
    setLastName(modifiedValues.lastName);
    setEmail(modifiedValues.email);
    setPhone(modifiedValues.phone);
    setNewPassword(modifiedValues.newPassword);
    setConfirmPassword(modifiedValues.confirmPassword);
    setDesignation(modifiedValues.designation);
    setDepartment(modifiedValues.department);
    setEmailNotifications(modifiedValues.emailNotifications);
    setIsUpdated(true); 

    if(!validateForm())
    {
        return;
    }

    send_backend(modifiedValues)
    
    window.alert("User Profile updated")
    
  };
  
  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <div className="formbold-profile-photo">
        <img src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="Profile Photo" class="formbold-profile-img" />
      </div>
      <h2>My Profile</h2>
      <br />
      <br />
      <form action="https://formbold.com/s/FORM_ID" method="POST" onSubmit={handleSubmit}>
        <div className="formbold-input-flex">
          <div>
            <label htmlFor="firstname" className="formbold-form-label">
              First name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder=""
              value={firstName}
              onChange={handleChangeFirstName}
              className="formbold-form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="formbold-form-label">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder=""
              value={lastName}
              onChange={handleChangeLastName}
              className="formbold-form-input"
              required
            />
          </div>
        </div>

        <div className="formbold-input-flex">
          <div>
            <label htmlFor="email" className="formbold-form-label">
              Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={email}
              onChange={handleChangeEmail}
              className="formbold-form-input"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="phone" className="formbold-form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder=""
              value={phone}
              onChange={handleChangePhone}
              className="formbold-form-input"
              required
            />
          </div>
        </div>

        <div className="formbold-input-flex">
          <div>
            <label htmlFor="newPassword" className="formbold-form-label">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder=""
              value={newPassword}
              onChange={handleChangeNewPassword}
              className="formbold-form-input"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="formbold-form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=""
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              className="formbold-form-input"
            />
          </div>
        </div>

        <div className="formbold-input-radio-wrapper">
          <label htmlFor="designation" className="formbold-form-label">
            Designation
          </label>

          <div className="formbold-radio-flex">
            <div className="formbold-radio-group">
              <label className="formbold-radio-label">
                <input
                  className="formbold-input-radio"
                  type="radio"
                  name="designation"
                  id="professor"
                  value="Professor"
                  checked={designation === "Professor"}
                  onChange={handleChangeDesignation}
                />
                Professor
                <span className="formbold-radio-checkmark"></span>
              </label>
            </div>

            <div className="formbold-radio-group">
              <label className="formbold-radio-label">
                <input
                  className="formbold-input-radio"
                  type="radio"
                  name="designation"
                  id="assistantProfessor"
                  value="Assistant Professor"
                  checked={designation === "Assistant Professor"}
                  onChange={handleChangeDesignation}
               
                  />
                  Assistant Professor
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="designation"
                    id="associateProfessor"
                    value="Associate Professor"
                    checked={designation === "Associate Professor"}
                    onChange={handleChangeDesignation}
                  />
                  Associate Professor
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
            </div>
          </div>
  
          <div className="formbold-input-radio-wrapper">
            <label htmlFor="department" className="formbold-form-label">
              Department
            </label>
  
            <div className="formbold-radio-flex">
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="cse"
                    value="CSE"
                    checked={department === "CSE"}
                    onChange={handleChangeDepartment}
                  />
                  CSE
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="cse-ai"
                    value="CSE - AI"
                    checked={department === "CSE - AI"}
                    onChange={handleChangeDepartment}
                  />
                  CSE - AI
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="ece"
                    value="ECE"
                    checked={department === "ECE"}
                    onChange={handleChangeDepartment}
                  />
                  ECE
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="eee"
                    value="EEE"
                    checked={department === "EEE"}
                    onChange={handleChangeDepartment}
                  />
                  EEE
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="cce"
                    value="CCE"
                    checked={department === "CCE"}
                    onChange={handleChangeDepartment}
                  />
                  CCE
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
              <div className="formbold-radio-group">
                <label className="formbold-radio-label">
                  <input
                    className="formbold-input-radio"
                    type="radio"
                    name="department"
                    id="cvl"
                    value="CVL"
                    checked={department === "CVL"}
                    onChange={handleChangeDepartment}
                  />
                  CVL
                  <span className="formbold-radio-checkmark"></span>
                </label>
              </div>
  
             
              <div className="formbold-radio-group">
              <label className="formbold-radio-label">
                <input
                  className="formbold-input-radio"
                  type="radio"
                  name="department"
                  id="mee"
                  value="MEE"
                  checked={department === "MEE"}
                  onChange={handleChangeDepartment}
                />
                MEE
                <span className="formbold-radio-checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="formbold-input-radio-wrapper">
          <label htmlFor="emailNotifications" className="formbold-form-label">
            Email Notifications
          </label>

          <div className="formbold-radio-flex">
            <div className="formbold-radio-group">
              <label className="formbold-radio-label">
                <input
                  className="formbold-input-radio"
                  type="radio"
                  name="emailNotifications"
                  id="emailNotificationsYes"
                  value="yes"
                  checked={emailNotifications === true}
                  onChange={handlenotificationsetter}
                />
                Yes
                <span className="formbold-radio-checkmark"></span>
              </label>
            </div>

            <div className="formbold-radio-group">
              <label className="formbold-radio-label">
                <input
                  className="formbold-input-radio"
                  type="radio"
                  name="emailNotifications"
                  id="emailNotificationsNo"
                  value="no"
                  checked={emailNotifications === false}
                  onChange={handlenotificationunsetter}
                />
                No
                <span className="formbold-radio-checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="formbold-btn">
          Update Profile
        </button>
      </form>
    </div>
  </div>
);
};

export default Faculty_Edit_Profile;
  