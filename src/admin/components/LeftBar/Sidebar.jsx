import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SideBarItem from "./sidebar-item";

import "./Sidebar.scss";
import logo from "../../assets/images/logo.png";
import LogoutIcon from "../../assets/icons/logout.svg";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { logoutUser } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";

function Sidebar({ menu }) {
  const location = useLocation();

  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };
  return (
    <div className="sidebar-admin">
      {["lg"].map((expand) => (
        <Navbar key="lg" expand="lg" className="bg-body-tertiary mb-3">
          <Container fluid className="content">
            <Navbar.Brand href="#"></Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Header id="offcanvasNavbarLabel-expand-lg">
                  Menu
                </Offcanvas.Header>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="sidebar">
                  <div className="sidebar-menu">
                      <div className="sidebar-logo">
                        <img src={logo} alt="logo" />
                      </div>
                      <div className="sidebar-items">
                        {menu.map((item, index) => (
                          <div key={index} onClick={() => __navigate(item.id)}>
                            <SideBarItem active={item.id === active} item={item} />
                          </div>
                        ))}
                      </div>
                  </div>
                  

                  <div className="sidebar-footer" onClick={handleLogout}>
                    <span className="sidebar-item-label">Logout</span>
                    <img
                      src={LogoutIcon}
                      alt="icon-logout"
                      className="sidebar-item-icon"
                    />
                  </div>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default Sidebar;
