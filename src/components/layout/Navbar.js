import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar(props) {
  return (
    <nav>

      <div className="navItem">
        <NavLink to="/coursemates">Coursemates</NavLink>
      </div>

      <div className="navItem">
        <NavLink to="/favStudents">Favourites</NavLink>
      </div>

      <div className="navItem">
        <NavLink to="/groupassessments">Group Assessments</NavLink>
      </div>

      <div className="navItemWelcome">
      <p className="welcome">Welcome  {props.loggedInUser} | </p> 
      </div>

      <div className='logOut'>
       <NavLink to="/">Log out</NavLink>
      </div>

    </nav>
  );
}

export default Navbar;
