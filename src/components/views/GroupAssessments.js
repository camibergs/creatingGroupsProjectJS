import { useState, useEffect } from "react";
import View from "../UI/View.js";
import Searchbar from "./Searchbar.js";
import { Card, CardContainer } from "../UI/Card.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import { useNavigate } from "react-router-dom";
import "./GroupAssessments.scss";
import apiURL from "../api/API_URL.js";

export default function GroupAssessments(props) {
  // Initialisation ------------------------------
  const url = `${apiURL}/assessments/leader/820`;
  const navigate = useNavigate();

  // State ---------------------------------------
  const [groupAssessments, setGroupAssessments] = useState(null);
  
  const get = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setGroupAssessments(data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
        setGroupAssessments([]); // Set assessments to an empty array on error
      }
    };

    useEffect(() => {
      get();
    }, []);

    console.log("Group Assessments:", groupAssessments);

  // Handlers ------------------------------------
  const handleButtonClick = () => {
    navigate("/propose");
  };

  // View ----------------------------------------
  return (
    <>
      {!groupAssessments ? (
        <p>Loading Assessment records ...</p>
      ) : groupAssessments.length === 0 ? (
        <p>No Assessment records found 🙂</p>
      ) : (
        <View>
          <Header />
          <Navbar />
          <div className="groupAssessments">
          <h1>Group Assessments</h1>

          <div className="groupAssessmentsList">
            {groupAssessments.map((assessment) => (
            <div className="groupAssessmentslist" key={assessment.AssessmentID}>
              <div className="assessmentDetails">
                <p>{assessment.AssessmentName}</p>
               </div>
                <button type="button" onClick={handleButtonClick}>
                  Propose group members
                </button>
             </div>
             ))}
           </div>
          </div>
        </View>
      )}
    </>
  );
}
