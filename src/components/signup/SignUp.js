import React, { useState } from "react";
import "./signup.scss";
import { Button } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    validateEmail(email);

    if (fullname.trim() === "") setFullnameError("Enter full name");
    else setFullnameError("");

    if (phone.trim() === "") setPhoneError("Enter phone number");
    else setPhoneError("");

    if (country.trim() === "") setCountryError("Enter country");
    else setCountryError("");

    if (gender === "") setGenderError("Select gender");
    else setGenderError("");

    if (password.length < 1) setPasswordError("Enter password");
    else setPasswordError("");

    if (email.length < 1) setEmailError("Enter email");
    else {
      setEmailError("");

      // Perform sign-up action
      const newUser = {
        fullname: fullname,
        email: email,
        phone: phone,
        country: country,
        gender: gender,
        address: address,
        avatar: avatar,
        password: password,
      };

      axios
        .post("https://fpc-shop.azurewebsites.net/api/User", newUser)
        .then(function (response) {
          if (response.data.success) {
            toast.success(response.data.message); // Show success message from the server
            navigate("/login");
          } else {
            toast.error("User creation failed"); // Show an error message in case of failure
          }
        })
        .catch(function (error) {
          toast.error("Create new user failed");
          console.error("Error in API request:", error);
        });
    }
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="signup-form">
      <form className="contentLogin row" onSubmit={handleSignUp}>
        <div className="col-12 text-center text-login">Sign Up</div>
        <div className="col-12 form-group input-login">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Nguyen Van A"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            className="form-control"
          />
          <div className="error-msg">{fullnameError}</div>
        </div>
        <div className="col-12 form-group input-login">
          <label>Email</label>
          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
          />
          <div className="error-msg">{emailError}</div>
        </div>
        <div className="col-12 form-group input-login">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="form-control"
          />
          <div className="error-msg">{phoneError}</div>
        </div>
        <div className="col-12 form-group input-login">
          <label>Country</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="form-control"
          />
          <div className="error-msg">{countryError}</div>
        </div>
        <div className="col-12 form-group input-login">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className="form-control"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="error-msg">{genderError}</div>
        </div>
        <div className="col-12 form-group input-login">
          <label>Address</label>
          <textarea
            placeholder="Enter address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-12 form-group input-login">
          <label>Avatar</label>
          <input
            type="text"
            onChange={(event) => setAvatar(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-12 form-group input-login">
          <label>Password</label>
          <div className="custom-input-password">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder=""
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
            />
            <span onClick={handleShowHidePassword}>
              <i>{isShowPassword ? <BsEyeSlashFill /> : <BsEyeFill />}</i>
            </span>
          </div>
          <div className="error-msg">{passwordError}</div>
        </div>
        <div className="col-12">
          <Button className="btn-login" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
