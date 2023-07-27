import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/apiRequest";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// import "./Sidebar.scss";
import logo from "../../assets/images/logo.png";

function SideBarItem({ menu }) {
  const location = useLocation();
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

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
      <div className={`sidebar ${isVisible ? "expanded" : "collapsed"}`}>
        <Nav className="flex-column">
          <Nav.Item>
            <Link to="/components" className="nav-link">
              <div className="sidebar-header">
                <img src={logo} alt="Logo" />
              </div>
              <span id="a">FPC</span>
            </Link>
          </Nav.Item>
          {menu.map((item) => (
            <Nav.Item key={item.id}>
              <Link
                to={item.path}
                className={`nav-link ${active === item.id ? "active" : ""}`}
              >
                <i className={`fa fa-fw ${item.icon}`} />
                <span>{item.label}</span>
              </Link>
            </Nav.Item>
          ))}
          <Nav.Item onClick={handleLogout}>
            <Link to="/logout" className="nav-link">
              <i className="fa fa-fw fa-sign-out" />
              <span>Logout</span>
            </Link>
          </Nav.Item>
        </Nav>
        <div className="toggle-button" onClick={() => setIsVisible(!isVisible)}>
          <i className={`fa fa-chevron-${isVisible ? "left" : "right"}`} />
        </div>
      </div>
    </div>
  );
}

export default SideBarItem;