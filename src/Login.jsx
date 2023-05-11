import React from 'react';
import './Login.css'

class Login extends React.Component {

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
    <div>
      
      <div class="container">
      <div class="forms-container">
      <div class="signin-signup">

      <form action="login_check.php" method="post" class="sign-in-form">

      <h2 class="title">Log In</h2>
      
      <div class="input-field">
       <i class="fas fa-user"></i>
       <input type="email" placeholder="Email-id" name="user_email"/>
      </div>
      
      <div class="input-field">
       <i class="fas fa-lock"></i>
       <input type="password" placeholder="Password" name="user_password" />
      </div>
      
      <input class="btn solid" type="submit" value="Login" name="login-user"/>
     </form>

     <form action="register_user.php" method="post" class="sign-up-form">
      <h2 class="title">Sign up</h2>
      
      <div class="input-field">
       <i class="fas fa-envelope"></i>
       <input type="email" placeholder="Email" name = "register_email"/>
      </div>
      
      <div class="input-field">
       <i class="fas fa-lock"></i>
       <input type="password" placeholder="Password" name="register_password"/>
      </div>
      
      <input type="submit" class="btn" value="Sign up" name="signup_user"/>
     </form>

     </div>
     </div>

     <div class="panels-container">
    <div class="panel left-panel">
     <div class="content">
      <h3>Forgot your Password?</h3>
      <p>
       Click here to reset your password
      </p>
      <button class="btn transparent" id="sign-up-btn" script="padding: 10dp" >Forget Password</button>
     </div>
     <img src="img/log.svg" class="image" alt="" />
    </div>
    <div class="panel right-panel">
     <div class="content">
      <h3>Already have an account?</h3>
      <p>
       Click the log in Button
      </p>
      <button class="btn transparent" id="sign-in-btn">Log-In</button>
     </div>
     <img src="img/register.svg" class="image" alt="" />
    </div>
    </div>

     </div>


    </div>

    );
  }
}

export default Login;
