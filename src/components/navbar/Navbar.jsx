import React from "react";
import "./navbar.scss";
import logo from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="Image Name" />
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
              <NavLink className="nav-link active" aria-current="page" to="/">
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
            <a href="" className="btn btn-outline-dark">
              <div className="fa fa-thin fa-envelope"></div>
            </a>
            <a href="" className="btn btn-outline-dark">
              <div className="fa fa-regular fa-bell"></div>
            </a>
            <NavLink to="/login" className="btn btn-outline-dark">
              <div className="fa fa-solid fa-user me-1">Login</div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
