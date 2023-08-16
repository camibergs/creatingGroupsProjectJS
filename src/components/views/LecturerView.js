import { useState, useEffect } from 'react';
import Action from '../UI/Actions.js';
import { CardContainer } from '../UI/Card.js';
import Header from '../layout/Header.js';
import LecturerNavbar from '../../components/layout/LecturerNavbar.js';
import AssessmentCard from '../entity/assessments/AssessmentCard.js';
import AssessmentForm from '../entity/assessments/AssessmentForm.js';
import './LecturerView.scss';
import apiURL from '../../api/API_URL.js';

function LecturerView() {
  // Initialisation ------------------------------
  const loggedInLecturer = 820;
  const myModulesEndpoint = `${apiURL}/assessments/leader/${loggedInLecturer}`;

  // State ---------------------------------------
  const [assessments, setAssessments] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
      setAssessments(result);
  };

  useEffect(() => {
    apiGet(myModulesEndpoint);
  }, [myModulesEndpoint]);

  // Handlers ------------------------------------
  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSuccess = () => {
    setShowForm(false);
    apiGet(myModulesEndpoint); // Fetch updated data after successful form submission
  };

  // View ----------------------------------------
  return (
    <>
    <Header />
    <LecturerNavbar />
      <div className='lecturerPage'>
      <h1>List of assessments:</h1>

         <Action.Tray>
            {!showForm && <Action.Add showText buttonText="Add New Assessment" onClick={handleAdd} />}
        </Action.Tray>

        {showForm && <AssessmentForm onCancel={handleCancel} onSuccess={handleSuccess}/>}

        {!assessments ? (
          <p>Loading records ... </p>
        ) : assessments.length === 0 ? (
          <p>No records found</p>
        ) : (
        <CardContainer>
          {assessments.map((assessment) => (
            <AssessmentCard assessment={assessment} key={assessment.AssessmentID} />
        ))}
        </CardContainer>
      )}
      </div>
    </>
  );
}

export default LecturerView;