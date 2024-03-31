import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// styles
import "./style.css";

//action
import { logout } from "../../actions/app";

//logo
import pdLogo from "../../assets/PD-Logo_Orange.png";
import unileverLogo from "../../assets/unilever-logo.png"

function Header({isAuthenticated, logout}) {
  const navigate = useNavigate();

  return (
    <div className="main-header">
      <div className="app-logo">
        <img src={pdLogo} alt="parallelDots logo" />
      </div>
      <div className="nav-bar">
        <div className="nav-item" onClick={() => navigate("/")}>
          Video Gallery
        </div>

        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          Dashboard
        </div>

        {isAuthenticated && (
          <div className="logout" onClick={logout}>
            Logout
          </div>
        )}

        <div className="uni-logo">
          <img src={unileverLogo} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.home.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);

