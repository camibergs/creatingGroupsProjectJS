import Header from "../layout/Header.js";
import "./Proposals.scss";
import apiURL from "../api/API_URL.js";

function Proposals() {
  // Initialisation ------------------------------
  const url = `${apiURL}/users/likes/277`;

  // State ---------------------------------------

  // Handlers ------------------------------------

  // View ----------------------------------------
  return (
    <>
    <Header/>

      <div className="proposalPage">
        <h1>Students proposed students</h1>

        <main className="mylinks">
          <div className="paneFavourites">
            <h3>Students</h3>
            <div className="formEntry"></div>
          </div>
          
          <div className="paneProposals">
            <h3>Proposed members</h3>
          </div>
        </main>

      </div>
    </>
  );
}

export default Proposals;
