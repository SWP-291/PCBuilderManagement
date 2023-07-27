import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "../../../components/assets/image/logo.png";
import "./SideNavBar.scss";
import { logoutUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
const SideNavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logoutUser(dispatch);
  };
  return (
    <div className={`sidebar ${isVisible ? "expanded" : "collapsed"}`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/components" className="nav-link">
          <div className="sidebar-header">
            <img src={logo} alt="Logo" />
          </div>
          <span id='a'>FPC</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/components" className="nav-link">
            <i className="fa fa-fw fa-cube" />
            <span>Component</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/orderslist" className="nav-link">
            <i className="fa fa-fw fa-shopping-cart" />
            <span>Orders</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile" className="nav-link">
            <i className="fa fa-fw fa-user" />
            <span>Profile</span>
          </Link>
        </Nav.Item>
        <Nav.Item onClick={handleLogout}>
          <Link to="/logout" className="nav-link" >
            <i className="fa fa-fw fa-sign-out" />
            <span>Logout</span>
          </Link>
        </Nav.Item>
      </Nav>
      <div className="toggle-button" onClick={() => setIsVisible(!isVisible)}>
        <i className={`fa fa-chevron-${isVisible ? "left" : "right"}`} />
      </div>
    </div>
  );
};

export default SideNavBar;
