// import React, { useState } from "react";
// import "./login.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Login() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [passwordError, setpasswordError] = useState("");
//   const [emailError, setemailError] = useState("");

//   const handleValidation = (event) => {
//     let formIsValid = true;

//     if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
//       formIsValid = false;
//       setemailError("Email Not Valid");
//       return false;
//     } else {
//       setemailError("");
//       formIsValid = true;
//     }

//     if (!password.match(/^[a-zA-Z]{8,22}$/)) {
//       formIsValid = false;
//       setpasswordError(
//         "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
//       );
//       return false;
//     } else {
//       setpasswordError("");
//       formIsValid = true;
//     }

//     return formIsValid;
//   };

//   const loginSubmit = (e) => {
//     e.preventDefault();
//     handleValidation();
//   };

//   return (
//     //   <div className="login-container">
//     //     <div className="form-container">
//     //       <div className="row d-flex justify-content-center align-items-center">
//     //         <div className="col-md-4">
//     //           <h1>Login Form</h1>
//     //           <form id="loginform" onSubmit={loginSubmit}>
//     //             <div className="form-group">
//     //               <label>Email address</label>
//     //               <input
//     //                 type="email"
//     //                 className="form-control"
//     //                 id="EmailInput"
//     //                 name="EmailInput"
//     //                 aria-describedby="emailHelp"
//     //                 placeholder="Enter email"
//     //                 onChange={(event) => setEmail(event.target.value)}
//     //               />
//     //               <small id="emailHelp" className="text-danger form-text">
//     //                 {emailError}
//     //               </small>
//     //             </div>
//     //             <div className="form-group">
//     //               <label>Password</label>
//     //               <input
//     //                 type="password"
//     //                 className="form-control"
//     //                 id="exampleInputPassword1"
//     //                 placeholder="Password"
//     //                 onChange={(event) => setPassword(event.target.value)}
//     //               />
//     //               <small id="passworderror" className="text-danger form-text">
//     //                 {passwordError}
//     //               </small>
//     //             </div>
//     //             <div className="form-group form-check">
//     //               <input
//     //                 type="checkbox"
//     //                 className="form-check-input"
//     //                 id="exampleCheck1"
//     //               />
//     //               <label className="form-check-label">Check me out</label>
//     //             </div>
//     //             <button type="submit" className="btn btn-primary">
//     //               Submit
//     //             </button>
//     //           </form>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // );

//     <div className="login template d-flex justify-content-center align-items-center vh-100">
//       <div className="form-container p-5 rounded bg-white">
//         <form>
//           <h3 className="text-center">Login</h3>
//           <div className="mb-2">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               className="form-control"
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="form-control"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="checkbox"
//               className="custom-control custom-checkbox"
//               id="check"
//             />
//             <label htmlFor="check" className="custom-input-label ms-2">
//               Remember me
//             </label>
//           </div>
//           <div className="d-gird">
//             <button className="btn btn-primary">Sign in</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Login;

import React, { useState } from "react";
import "./login.scss";
import { Button } from "react-bootstrap";
import { BiLogoGmail } from "react-icons/bi";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { userService } from "../services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = (e) => {
    // e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    axios
      .get(
        "https://localhost:7262/api/User",
        {
          email: email,
          password: password,
        },
        config
      )
      .then((response) => {
        setMessage("You're logged in");
        navigate("/"); // điều hướng user sang trang home.
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Login failed");
      });
  };

  const handleShowHidePassword = (event) => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="loginform">
      <div className="container">
        <div className="contentLogin row">
          <div className="col-12 text-ceter text-login">Login</div>
          <div className="col-12 form-group input-login">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => handleOnChangeEmail(event)}
              className="form-control"
            />
          </div>
          <div className="col-12 form-group input-login">
            <label>Password</label>
            <div className="custom-input-password">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => handleOnChangePassword(event)}
                className="form-control"
              />
              <span onClick={(event) => handleShowHidePassword(event)}>
                <i>{isShowPassword ? <BsEyeSlashFill /> : <BsEyeFill />}</i>
              </span>
            </div>
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {" "}
            {errorMessage}
          </div>
          <div className="col-12">
            <Button className="btn-login" onClick={() => handleLogin()}>
              Login
            </Button>
          </div>

          <div className="col-12 form-group text-foget">
            <a href="#">Forget your password ?</a>
          </div>
          <div className="col-12 form-group text-otherlogin">
            <label>Or login with</label>
          </div>
          <div className="col-12">
            <Button className="btn-gmail">
              <BiLogoGmail />
              Gmail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
