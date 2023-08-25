import React, { useState, useEffect } from "react";
import { CardContainer } from "../UI/Card.js";
import StudentCard from "./StudentCard.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import { Draggable, Droppable } from "../UI/DragAndDrop";
import "./ProposeGroupMembers.scss";
import apiURL from "../api/API_URL.js";

function ProposeGroupMembers() {
  // Initialisation ------------------------------
  const url = `${apiURL}/users/likes/277`;

  // State ---------------------------------------
  const [students, setStudents] = useState([]);
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

  // View ----------------------------------------
  return (
    <>
      <Header />
      <Navbar />

      <div className="proposePage">
        <h1>Propose group members</h1>

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
                    >
                      <StudentCard student={student} />
                    </Draggable>
                  ))}
                </CardContainer>
              </Draggable>
            </div>
          </div>
          
          <div className="paneProposals">
            <h3>Proposed members</h3>
            <Droppable className="droppableRegion" />
          </div>
        </main>
      </div>
    </>
  );
}

export default ProposeGroupMembers;
