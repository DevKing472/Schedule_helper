import React,{useRef} from 'react';

import './Login.css'
import image1 from './assets/log.svg';
import image2 from './assets/register.svg';
import axios from 'axios';

class OTPForm extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      otpError: false
    };
  }

  async handle_otp_backend(otp)
  {
    try{

      const response = await axios.post("http://localhost:5000/otp_handle",{ email: this.props.sharedEmail,otp: otp });
  
      if(response.status === 200)
      {
        //proceed to otp component
        localStorage.setItem("UserEmail",response.email)
        return true;
      }
      else if(response.status === 404)
      {
        //print error that email not found
        alert("Email is not Registered with us. Please check again!")
        return false
      }
      else{
        alert("Cannot Connect with Server")
        return false
      }
      }
      catch(e)
      {
        console.log(e)
        return false
      }
  }

  handleSubmit = async (event) => {

    event.preventDefault();
    let otp = event.target.elements.register_otp.value;

    if (otp.length < 6) {
      this.setState({ otpError: true });
      return
    } else {
      this.setState({ otpError: false });
    }

    if(await this.handle_otp_backend(otp))//send the OTP to backend and check if it is valid.
    {
      alert("Sucessful Login")
      this.setState({ otpError: false });
    }
    else{
      this.setState({ otpError: true });
    }
  };

  render()
  {
    return (
      <form method="post" class="sign-up-form" onSubmit={this.handleSubmit}>
      <h2 class="title">Enter Your OTP</h2>
      <div class="input-field">
      <i class="fas fa-lock"></i>
      <input type="OTP" placeholder="Your OTP" name = "register_otp" required/> 
      </div>
      {this.state.otpError && <ErrorMsg message="Please Enter a Valid OTP"/>}
      <input type="submit" class="btn" value="Submit OTP" name="submit_otp"/>
    </form>
    )
  }
}

class LoginForm extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      loginError: false
    };

    this.buttonRef = React.createRef();

  }

  async backendauth(email,password)
  {

    try{

    const response = await axios.post("http://localhost:5000/loginuser",{ email: email, password: password });

    if(response.status === 200)
    {
      let return_obj = {
              name: response.data.name,
              email: response.data.email,
              isLoggedin: true
            }
      localStorage.setItem("UserEmail",return_obj.email)

      return return_obj;
    }
    else if(response.status === 404){
      return {isLoggedin: false}
    }
    else{
      alert("Cannot Connect with Server")
      return;
    }

    }
    catch(e)
    {
      console.log(e)
      return {isLoggedin: false}
    }

  }

  handlelogin = async (event) => {
    event.preventDefault();
    let email = event.target.elements.user_email.value;
    let password = event.target.elements.user_password.value;

    if (email.trim() !== '') 
    {
      this.setState({ loginError: false });
    } else {
      this.setState({ loginError: true });
      return;
    }

    if(password.length > 5)
    {
      this.setState({loginError: false})
    }
    else{
      this.setState({loginError: true})
      alert("Password should be atleast 6 characters long")
      return;
    }

    const backend_resp = await this.backendauth(email,password)

    if(backend_resp.isLoggedin)
    {
      window.location.href = "/dashboard"
    }
    else 
    {
      alert("Enter Correct credentials")
      this.setState({ loginError: true });
    }

  };

    render()
    {

      const { loginError } = this.state;

      return (
      <form method="post" class="sign-in-form" onSubmit={this.handlelogin}>
            <h2 class="title">Log In</h2>
            <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="email" placeholder="Email-id" name="user_email" />
            </div>
            <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" name="user_password"  />
            </div>
            {loginError && <ErrorMsg message="Please Provide a Valid Email and password"/>}
            <input class="btn solid" type="submit" value="Login" name="login-user"/>
          </form>
    )
    }
}

function ErrorMsg({message}) 
  {

    const errorStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid #921515',
      borderRadius: '4px',
      padding: '8px',
      color: '#921515'
    };
  
    const errorIconStyle = {
      color: '#921515',
      marginRight: '8px',
    };
  
    const errorTextStyle = {
      fontWeight: 'bold',
    };

    return (
      <div className="error-message" style={errorStyle}>
        <i className="fas fa-exclamation-circle" style={errorIconStyle}></i>
        <span style={errorTextStyle}>&nbsp;{message}</span>
    </div>
    );
  }


class ForgetPassword extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      forgetError: false
    };
  }

  async forget_backend(email)
  {

    try{

    const response = await axios.post("http://localhost:5000/forget_email",{ email: email });

    if(response.status === 200)
    {
      //proceed to otp component
      return true;
    }
    else if(response.status === 404)
    {
      //print error that email not found
      alert("Email is not Registered with us. Please check again!")
      return false
    }
    else{
      alert("Cannot Connect with Server")
      return false
    }

    }
    catch(e)
    {
      console.log(e)
      return false
    }

  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let email = event.target.elements.register_email.value;

    if (email.trim() !== '') {
      this.setState({ forgetError: false });
    } else {
      this.setState({ forgetError: true });
      return;
    }

    let boole = await this.forget_backend(email)

    if (boole)
    {
      alert("OTP sent")
      this.setState({ forgetError: false });
      this.props.updateSharedVariable(1);
      this.props.updateSharedEmail(email)
      alert(this.props.sharedVariable)
    }
    else 
    {
      this.setState({ forgetError: true });
      return;
    }

  };

    render()
    {

      const { forgetError } = this.state;

      return (
        
        <form method="post" class="sign-up-form" onSubmit={this.handleSubmit}>
          <h2 class="title">Forget Password</h2>
          <div class="input-field">
          <i class="fas fa-envelope"></i>
          <input type="email" placeholder="Your Registered Email" name = "register_email" required/> 
          </div>
          {forgetError && <ErrorMsg message="Please Provide a Valid Email"/>}
          <input type="submit" class="btn" value="Send OTP" name="signup_user"/>
          
        </form>
      )
    }
}


class Login extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      forget_counter : 0,
      sharedEmail: ""
    }
  }

  updateSharedEmail = (new_email) => {
    this.setState({
      sharedEmail : new_email
    })
  }

  updateSharedVariable = (newValue) => {
    this.setState({
      forget_counter: newValue,
    });
  }

  componentDidMount() {
    // JavaScript code specific to the login page can be placed here
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });

  }


  render() 
  {
    // Your login JSX code goes here
    return (

      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">

        <LoginForm sharedVariable={this.state.forget_counter} sharedEmail={this.state.sharedEmail} updateSharedVariable={this.updateSharedVariable}/>

        {this.state.forget_counter == 0 && (
         <ForgetPassword sharedVariable={this.state.forget_counter} sharedEmail={this.state.sharedEmail} updateSharedEmail={this.updateSharedEmail} updateSharedVariable={this.updateSharedVariable}/>
        )}
        {this.state.forget_counter == 1 && (
          <OTPForm sharedVariable={this.state.forget_counter} sharedEmail={this.state.sharedEmail} updateSharedEmail={this.updateSharedEmail} updateSharedVariable={this.updateSharedVariable}/>

          // <LoginForm sharedVariable={this.state.forget_counter} updateSharedVariable={this.updateSharedVariable}/>
        )}

        </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
          <div class="content">
            <h3>Forgot your Password?</h3>
            <p>
            Click here to reset your password
            </p>
            <button class="btn transparent" id="sign-up-btn">Forget Password</button>
          </div>
          <img src={image1} class="image" alt="" />
          </div>
          <div class="panel right-panel">
          <div class="content">
            <h3>Already have an account?</h3>
            <p>
            Click the log in Button
            </p>
            <button class="btn transparent" id="sign-in-btn">Log-In</button>
          </div>
          <img src={image2} class="image" alt="" />
          </div>
        </div>
        </div>

    );
  }
}

export default Login;
