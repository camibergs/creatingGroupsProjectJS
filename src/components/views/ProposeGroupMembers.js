import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import './ProposeGroupMembers.scss';

function ProposeGroupMembers() {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <>
    <Header />
    <Navbar />
    <div className="proposePage"> 
      <h1>Propose group members</h1>
    </div>
    </>    
  );
}

export default ProposeGroupMembers;