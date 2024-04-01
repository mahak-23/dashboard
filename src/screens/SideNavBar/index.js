import React from "react";
import { NavLink } from "react-router-dom";

//icons
import {
  FaCog,
  FaBars,
  FaSearch,
  FaHome,
  FaExchangeAlt,
  FaUsers,
  FaHistory,
  FaBell,
  FaQuestionCircle,
  FaEllipsisV,
} from "react-icons/fa";

//style
import "./style.css";

//image
import profile from "../../assets/profile.jpg";

const ICON_SIZE = 20;

function SideNavBar({ visible, show }) {
  return (
    <>
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={() => show(!visible)}>
          <FaBars size={24} />
        </button>
        <div className="mobile-logo">Dashboard</div>
      </div>
      <nav className={!visible ? "navbar" : ""}>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="logo">Dashboard</div>
            <button
              className="nav-btn"
              onClick={() => show(!visible)}
              style={{ transform: !visible ? "translateX(38px)" : "" }}
            >
              <FaBars size={24} />
            </button>
          </div>
          <div className="search-container">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="links nav-top">
            <NavLink to="/" className="nav-link" activeClassName="active">
              <FaHome size={ICON_SIZE} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/organization"
              className="nav-link"
              activeClassName="active"
            >
              <FaUsers size={ICON_SIZE} />
              <span>Organization</span>
            </NavLink>
            <NavLink to="/trades" className="nav-link" activeClassName="active">
              <FaExchangeAlt size={ICON_SIZE} />
              <span>Trades</span>
            </NavLink>
            <NavLink
              to="/history"
              className="nav-link"
              activeClassName="active"
            >
              <FaHistory size={ICON_SIZE} />
              <span>History</span>
            </NavLink>
          </div>
        </div>

        <div className="links">
          <div className="link">
            <FaBell size={ICON_SIZE} />
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              Notifications <span className="notif">12</span>
            </span>
          </div>
          <div className="link">
            <FaQuestionCircle size={ICON_SIZE} />
            <span>Support</span>
          </div>
          <div to="/settings" className="link">
            <FaCog size={ICON_SIZE} />
            <span>Settings</span>
          </div>
          <div className="profile">
            <div className="profile-info">
              <div className="profile-img">
                <img src={profile} alt="profile" />
              </div>
              <div className="profile-name">
                <div>User Name</div>
                <div className="email">user@gmail.com</div>
              </div>
            </div>
            <FaEllipsisV size={ICON_SIZE} color="#ddd" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideNavBar;
