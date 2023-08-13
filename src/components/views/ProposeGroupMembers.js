import React, { useState, useEffect } from "react";
import { CardContainer } from "../UI/Card.js";
import StudentCard from "./StudentCard.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import { Draggable, Droppable } from '../UI/DragAndDrop';
import './ProposeGroupMembers.scss';

function ProposeGroupMembers() {
  // Initialisation ------------------------------
  const url = `http://softwarehub.uk/unibase/api/users/likes/277`;

  // State ---------------------------------------
  const [students, setStudents] = useState([]);
  const [likedStudents, setLikedStudents] = useState([]);

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

  // View ----------------------------------------
  return (
    <>
    <Header />
    <Navbar />

    <div className="proposePage"> 
      <h1>Propose group members</h1>

      <main className="mylinks">
        <div className="paneFavourites">
          <h3>Students</h3>
          <div className="formEntry">
            <input placeholder="Search a student"/>
          </div>
          <div className="draggableItems">

            <Draggable>
            <CardContainer>
            {likedStudents.map((student) => (
              <Draggable key={student.UserID} id={student.UserID} className="name fav"><StudentCard student={student} /></Draggable>
            ))}
            </CardContainer>
            </Draggable>

            <Draggable id="01" className="name fav">Josh GHANBARIPOUR</Draggable>
            <Draggable id="02" className="name fav">Max KENNEAVY</Draggable>
            <Draggable id="03" className="name fav">Duc NGUYEN</Draggable>
            <Draggable id="04" className="name">Ahmed ABDULLAHI</Draggable>
            <Draggable id="05" className="name">Sajad AHMAD</Draggable>
            <Draggable id="06" className="name">Sarah AHMAD</Draggable>
            <Draggable id="07" className="name">Tasveer AHMAD</Draggable>
            <Draggable id="08" className="name">Akthar AHMED</Draggable>
            <Draggable id="09" className="name">Daniyal AHMED</Draggable>
            <Draggable id="10" className="name">Ahmed AMAVASEE</Draggable>
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