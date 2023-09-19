import { useState, useEffect } from "react";
import { CardContainer } from "./Card.js";

// THE DRAGGABLE REUSABLE COMPONENT //////////////
export function Draggable(props) {
  // Initialisation ------------------------------
  const loggedInUser = 277;
  const dragRecord = { proposerID: loggedInUser };
  const dragEndpoint = `http://softwarehub.uk/unibase/api/proposals/`;

  const deleteLike = async (url) => {
    // Build request object
    const request = {
      method: "DELETE",
    };
    // Call the fetch
    let result = null;
    const response = await fetch(url, request);
    if (response.status !== 204) result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  // Handlers ----------------------------------
  // const handlePostLike = async (student) => {
  //   console.log(`you liked ${student.UserID}`);
  //   dragRecord.LikeeID = student.UserID;
  //   dragRecord.LikeAffinityID = 1;
  //   const result = await postLike(dragEndpoint, dragRecord);
  //   result.isSuccess ? props.get() : alert(`result: ${result.message}`);
  // };

  // const handlePostDislike = async (student) => {
  //   console.log(`you liked ${student.UserID}`);
  //   dragRecord.LikeeID = student.UserID;
  //   dragRecord.LikeAffinityID = 2;
  //   const result = await postLike(dragEndpoint, dragRecord);
  //   result.isSuccess ? props.get() : alert(`result: ${result.message}`);
  // };

  // const handlePutDislike = async (student) => {
  //   console.log(`you liked ${student.UserID}`);
  //   dragRecord.LikeeID = student.UserID;
  //   dragRecord.LikeAffinityID = 2;
  //   const result = await putLike(
  //     `${dragEndpoint}/${student.UserLikeID}`,
  //     dragRecord
  //   );
  //   result.isSuccess ? props.get() : alert(`result: ${result.message}`);
  // };

  const handleReset = async (student) => {
    console.log(`you reseted ${student.UserID}`);
    console.log(`student = ${JSON.stringify(student)}`);
    const result = await deleteLike(`${dragEndpoint}/${student.UserLikeID}`);
    result.isSuccess ? props.get() : alert(`result: ${result.message}`);
  };

  // State ---------------------------------------

  // Handlers ------------------------------------
  const handleDrag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  // View ----------------------------------------
  return (
    <div
      key={props.id}
      id={props.id}
      assessmentID={props.assessmentID}
      proposerID={loggedInUser}
      draggable="true"
      onDragStart={handleDrag}
      className={"className" in props && props.className}
    >
      {props.children}
    </div>
  );
}

// THE DROPPABLE REUSABLE COMPONENT //////////////
export function Droppable(props) {
  // Initialisation ------------------------------
  const loggedInUser = 277;
  const dragRecord = { proposerID: loggedInUser };
  const dragEndpoint = `http://softwarehub.uk/unibase/api/proposals/`;
  const dropEndpoint = `http://softwarehub.uk/unibase/api/proposals/assessments/${props.AssessmentID}/proposedby/${loggedInUser}`;

  const postDroppableObject = async (dragEndpoint, theProposalObject) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(theProposalObject),
      headers: { "Content-type": "application/json" },
    };
    // Call the fetch
    const response = await fetch(dragEndpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  // State ---------------------------------------
  const [proposeSaved, setProposeSaved] = useState([]);

  const getProposeSaved = async () => {
    try {
      const response = await fetch(dropEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch proposeSaved data.");
      }
      const data = await response.json();
      setProposeSaved(data); // Update proposeSaved with the fetched data
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProposeSaved();
  }, [dropEndpoint]);


  // Handlers ------------------------------------
  const handleDrop = (event) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    const droppableObject = document.getElementById(data);
    const theProposalObject = {
      ProposerID: loggedInUser,
      ProposeeID: droppableObject.id,
      ProposalAssessmentID: props.AssessmentID,
      ProposalConfirmationID: null,
    };
    console.log(`handle drop = ${JSON.stringify(theProposalObject)}`);
    postDroppableObject(dragEndpoint, theProposalObject);
    event.target.appendChild(droppableObject);
  };

  const allowDrop = (event) => event.preventDefault();

  console.log("Propose Saved:", proposeSaved);

  // View ----------------------------------------
  return (
    <>
      <div
        id={props.id}
        onDrop={handleDrop}
        onDragOver={allowDrop}
        className={"className" in props && props.className}
      >
        {props.children}
      </div>
        
      <div>
        {proposeSaved.map((proposee) => (
        <div
          className="groupAssessmentslist"
          key={proposee.proposeeID}
          
        >
          <CardContainer>
          <p>Proposee ID: {proposee.ProposeeID}</p>
          </CardContainer>
        </div> 
      ))}
      </div>
    </>
  );
}
