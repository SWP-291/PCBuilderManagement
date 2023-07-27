import React, { useState } from "react";
import "./navbar.scss";
import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(dispatch, navigate);
    } catch (error) {
      // Handle any unexpected errors during logout (optional).
      console.error("Logout failed due to unexpected error:", error);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py shadow-sm">
      {/* <div className="container"> */}
      <NavLink className="navbar-brand" to="/">
        <img className="logo" src={logo} alt="" />
        <span className="title">FPC</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-expanded={isNavbarOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}>
        <ul className="navbar-nav mb-lg-0 ">
          <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/policy">
              Support
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="buttons">
          {user ? (
            <>
              <div className="user">
                <img className="avatar" src={user.avatar} alt="" />
                <DropdownButton
                  id="dropdown-basic-button"
                  title={user.fullName}
                >
                  <Dropdown.Item>
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink className="nav-link" to="/history">
                      Purchase History
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink className="nav-link" to="/" onClick={handleLogout}>
                      Logout
                    </NavLink>
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline-dark">
                <div className="fa fa-solid fa-user me-1">Login</div>
              </NavLink>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}
