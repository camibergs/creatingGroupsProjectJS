import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation();
  const loggedInUser = location.state?.loggedInUser ?? `unknown`;

  // Trim down the email to remove the domain
  const trimmedUser = loggedInUser?.split("@")[0];

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/coursemates">Coursemates</NavLink>
      </div>

      <div className="navItem">
        <NavLink to="/groupassessments">Group Assessments</NavLink>
      </div>

      <div className="navItemWelcome">
        {/* <p className="welcome">Welcome {trimmedUser}</p> */}
      </div>

      <div className="logOut">
        <NavLink to="/">Log out</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
