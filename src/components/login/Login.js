import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

  return (
    //   <div className="login-container">
    //     <div className="form-container">
    //       <div className="row d-flex justify-content-center align-items-center">
    //         <div className="col-md-4">
    //           <h1>Login Form</h1>
    //           <form id="loginform" onSubmit={loginSubmit}>
    //             <div className="form-group">
    //               <label>Email address</label>
    //               <input
    //                 type="email"
    //                 className="form-control"
    //                 id="EmailInput"
    //                 name="EmailInput"
    //                 aria-describedby="emailHelp"
    //                 placeholder="Enter email"
    //                 onChange={(event) => setEmail(event.target.value)}
    //               />
    //               <small id="emailHelp" className="text-danger form-text">
    //                 {emailError}
    //               </small>
    //             </div>
    //             <div className="form-group">
    //               <label>Password</label>
    //               <input
    //                 type="password"
    //                 className="form-control"
    //                 id="exampleInputPassword1"
    //                 placeholder="Password"
    //                 onChange={(event) => setPassword(event.target.value)}
    //               />
    //               <small id="passworderror" className="text-danger form-text">
    //                 {passwordError}
    //               </small>
    //             </div>
    //             <div className="form-group form-check">
    //               <input
    //                 type="checkbox"
    //                 className="form-check-input"
    //                 id="exampleCheck1"
    //               />
    //               <label className="form-check-label">Check me out</label>
    //             </div>
    //             <button type="submit" className="btn btn-primary">
    //               Submit
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="form-container p-5 rounded bg-white">
        <form>
          <h3 className="text-center">Login</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-gird">
            <button className="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
