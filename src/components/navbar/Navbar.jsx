// import React, { useState } from "react";
import "./navbar.scss";
import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
export default function Navbar() {
  const user = useSelector(state => state.auth.login.currentUser);
  return (
    <nav className="navbar navbar-expand-lg navbar-light py shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="" />
          <span className="title">FPC</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0 ">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/user">
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
            {/* <a href="" className="btn btn-outline-dark">
              <div className="fa fa-thin fa-envelope"></div>
            </a>
            <a href="" className="btn btn-outline-dark">
              <div className="fa fa-regular fa-bell"></div>
            </a> */}
            {user ?
            <>
            <div className="user">
              <img className="avatar" src= {user.avatar} alt=''/> 
              <DropdownButton id="dropdown-basic-button" title={user.fullName}>
                <Dropdown.Item><NavLink className="nav-link" to="/profile">Profile</NavLink></Dropdown.Item>
                <Dropdown.Item><NavLink className="nav-link" to="/history">Purchase History</NavLink></Dropdown.Item>
                <Dropdown.Item><NavLink className="nav-link" to="/">Logout</NavLink></Dropdown.Item>
              </DropdownButton>
            </div>            
            </>
            :
            <>
              <NavLink to="/login" className="btn btn-outline-dark">
                <div className="fa fa-solid fa-user me-1">Login</div>
              </NavLink>
            </>}
          </div>
        </div>
      </div>
    </nav>
  );
}
