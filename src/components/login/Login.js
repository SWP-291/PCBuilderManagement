import React, { useState } from "react";
import "./Login.scss";
import { Button} from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validateEmail = (email) => {
      return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
  }
  const handleLogin = (e) => {
    e.preventDefault();
    validateEmail(email);
    if (password.length <1) setPasswordError("Enter password")
    else setPasswordError("");
    if (email.length <1) setEmailError ("Enter email")
    else
    {
      setEmailError("")
      const newUser = {
        email: email,
        password: password
      };
      loginUser(newUser, dispatch, navigate);
    }  
    
  }

  const handleShowHidePassword = (event) =>{
    setIsShowPassword(!isShowPassword)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Foget Password ?</Popover.Header>
      <Popover.Body>
        Relax and try remember your password.
      </Popover.Body>
    </Popover>
  );

  return (
    <div className='loginform'>
      <div className='container'>
        <form className='contentLogin row' onSubmit={handleLogin}>
          <div className="col-12 text-ceter text-login">
              Login
          </div> 
          <div className="col-12 form-group input-login">
              <label>Email</label>
              <input
                type="email" 
                placeholder="name@gmail.com" 
                value={email}
                onChange={(event) =>  setEmail(event.target.value)}
                className="form-control"
              />
          </div>
          <div className="col-12" style={{color: 'red'}}> {emailError}</div>
          <div className="col-12 form-group input-login">
              <label>Password</label>
              <div className='custom-input-password'>
              <input
                type={ isShowPassword ? "text" : "password" }
                placeholder="" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"              
                />
                <span onClick={(event)=> handleShowHidePassword(event)}>
                    <i>{isShowPassword ? <BsEyeSlashFill/> : <BsEyeFill/>}</i>
                </span>                
              </div>              
          </div>
          <div className="col-12" style={{color: 'red'}}> {passwordError}</div>
          <div className="col-12">
              <Button className="btn-login" type="submit">Login</Button>
          </div>        
          
          <OverlayTrigger className="col-12 form-group text-foget" placement="bottom" overlay={popover}>
              <a href="#">Forget your password ?</a>              
          </OverlayTrigger>
        </form>
      </div>
    </div> 
          
  );
}
export default Login;