import { useState, useEffect } from "react";
import View from "../UI/View.js";
import Searchbar from "./Searchbar.js";
import { Card, CardContainer } from "../UI/Card.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";

export default function GroupAssessments(props) {
  const [groupAssessments, setGroupAssessments] = useState(null);
  const url = `http://softwarehub.uk/unibase/api/assessments/leader/820`;

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
          <h1>Group Assessments</h1>

          <CardContainer>
            {groupAssessments.map((assessment) => (
              <Card key={assessment.AssessmentID}>
                <div className="groupAssessments">
                  <p>{assessment.AssessmentID}</p>
                  <p>{assessment.AssessmentName}</p>
                </div>
              </Card>
            ))}
          </CardContainer>
        </View>
      )}
    </>
  );
}
