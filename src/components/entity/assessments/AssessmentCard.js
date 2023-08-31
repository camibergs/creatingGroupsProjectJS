import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../UI/Card.js';
import apiURL from '../../api/API_URL.js';
import './AssessmentCard.scss';

function AssessmentCard({ assessment }) {
  // Initialisation ------------------------------
  const loggedInLecturer = 820;
  const assessmentsEndpoint = `${apiURL}/assessments/leader/${loggedInLecturer}`;

  // State ---------------------------------------
  const [assessments, setAssessments] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
      setAssessments(result);
  };

  useEffect(() => {
    apiGet(assessmentsEndpoint);
  }, [assessmentsEndpoint]);

  // Handlers ------------------------------------

  // View ----------------------------------------
  return (
    <>
      {!assessments ? (
        <p>Loading records ... </p>
      ) : assessments.length === 0 ? (
        <p>No Assessment records found 🙂</p>
      ) : (
          <div className="groupAssessments">
          <h1>List of Assessments</h1>

          <div className="groupAssessmentsList">
            {assessments.map((assessment) => (
            <div className="groupAssessmentslist" key={assessment.AssessmentID}>
              <div className="assessmentDetails">
                <p>{assessment.AssessmentName}</p>
               </div>
             </div>
             ))}
           </div>
          </div>
      )}
    </>
    
  );
}

AssessmentCard.propTypes = {
  assessment: PropTypes.shape({
    AssessmentID: PropTypes.number.isRequired,
    AssessmentName: PropTypes.string.isRequired,
    AssessmentPublishdate: PropTypes.string.isRequired,
  }),
};

export default AssessmentCard;