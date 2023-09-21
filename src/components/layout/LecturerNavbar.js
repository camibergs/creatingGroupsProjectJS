import { NavLink, useLocation } from "react-router-dom";
import "./LecturerNavbar.scss";

function LecturerNavbar() {
  // Initialisation ------------------------------
  const location = useLocation();
  const loggedInUser = location.state?.loggedInUser ?? `unknown`;

  // Trim down the email to remove the domain
  const trimmedUser = loggedInUser?.split("@")[0];

  // State ---------------------------------------
  // Handlers ------------------------------------
  // View -------------------------------------
  return (
    <nav> 

      <div className='navItem'>
        <NavLink to="/lecturerview">Assessments</NavLink>
      </div>

      <div className="navItemWelcome">
        <p className="welcome">Welcome {trimmedUser}</p>
      </div>

      <div className='logOut'>
        <NavLink to="/">Log out</NavLink>
      </div>


    </nav>
  );
}

export default LecturerNavbar;