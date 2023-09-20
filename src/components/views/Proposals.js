import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { CardContainer } from "../UI/Card.js";
import Header from "../layout/Header.js";
import "./Proposals.scss";
import apiURL from "../api/API_URL.js";

function Proposals() {
  // Initialisation ------------------------------
  const location = useLocation();
  const navigate = useNavigate();

  // Check if AssessmentID is available in the location state
  const { AssessmentID } = location.state || {};
  console.log(`AssessmentID=[${AssessmentID}]`);

  
  // State ---------------------------------------
  const [proposals, setProposals] = useState([]);

  const getProposals = async () => {
    try {
      // Construct the endpoint URL using AssessmentID
      const url = `${apiURL}/proposals/assessments/${AssessmentID}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch students data.");
      }
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (AssessmentID) {
      getProposals();
    }
  }, [AssessmentID]);


  // Handlers ------------------------------------
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // View ----------------------------------------
  return (
    <>
    <Header/>

    <button onClick={goBack} className="backButton">
      &laquo;Back
    </button>

      <div className="proposalPage" AssessmentID={AssessmentID}>
        <h1>Students proposed students</h1>

        <main className="mylinks">
         

          <div>
           {proposals.map((proposal) => (
            <div className="savedProposals" key={proposal.ProposalID} >
          <CardContainer>
          <div className="leftContent">
           <p>Proposal ID: {proposal.ProposalID}</p>
           <p>Proposer ID: {proposal.ProposerID}</p>
           <p>Proposee ID: {proposal.ProposeeID}</p>
          </div>
          <div className="rightContent">
         
           </div>
          </CardContainer>
        </div> 
      ))}
      </div>
        </main>

      </div>
    </>
  );
}

export default Proposals;
