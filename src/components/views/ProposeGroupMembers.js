import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardContainer } from "../UI/Card.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import { Draggable, Droppable } from "../UI/DragAndDrop";
import "./ProposeGroupMembers.scss";
import apiURL from "../api/API_URL.js";

function ProposeGroupMembers({ children }) {
  // Initialisation ------------------------------
  const url = `${apiURL}/users/likes/277`;
  const location = useLocation();
  const navigate = useNavigate();

  // State ---------------------------------------
  const [students, setStudents] = useState([]);
  const { AssessmentID } = location.state || {};
  console.log(`AssessmentID=[${AssessmentID}]`);
  let [likedStudents, setLikedStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch students data.");
      }
      const data = await response.json();
      setStudents(data);
      setLikedStudents(data); // Initialize filtered students with all students
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Handlers ------------------------------------
  likedStudents = likedStudents.filter(
    (student) => student.UserLikeAffinityID === 1
  );

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // View ----------------------------------------
  return (
    <>
      <Header />
      <Navbar />

      <div className="proposePage">
        {/* Add a Back button */}
        <button onClick={goBack} className="backButton">
          &laquo;Back
        </button>

        <h1>Propose group members</h1>
        <h3>Assessment ID: {AssessmentID}</h3>

        <main className="mylinks">
          <div className="paneFavourites">
            <h3>Liked coursemates</h3>
            <div className="formEntry"></div>
            <div className="draggableItems">
              <Draggable>
                <CardContainer>
                  {likedStudents.map((student) => (
                    <Draggable
                      key={student.UserID}
                      id={student.UserID}
                      className="name fav"
                      AssessmentID={AssessmentID}
                    >
                      <div className="studentCard">
                      <p>{student.UserEmail.substring(0, 8)}</p>
                      <p>{`${student.UserFirstname} ${student.UserLastname}`}</p>
                      <img
                        draggable="false"
                        className="img"
                        src={student.UserImageURL}
                        alt={student.UserEmail.substring(0, 8)}
                      />
                      {children}
                      </div>
                    </Draggable>
                  ))}
                </CardContainer>
              </Draggable>
            </div>
          </div>

          <div className="paneProposals">
            <h3>Proposed members</h3>
            <Droppable
              className="droppableRegion"
              AssessmentID={AssessmentID}
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default ProposeGroupMembers;
