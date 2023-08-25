import View from "../UI/View.js";
import { CardContainer } from "../UI/Card.js";
import CustomBorderCard from "./ColourIndicator.js";
import Header from "../layout/Header.js";
import Navbar from "../layout/Navbar.js";
import useLoad from '../api/useLoad.js';

export default function Students(props) {

  // Initialisation ------------------------------
  const studentGroupEndpoint = `/users/groups/1`;

  // State ---------------------------------------
  const [students, , loadingMessage, ] = useLoad(studentGroupEndpoint);

  // View ----------------------------------------
  return (
    <>
      {!students ? (
        <p>{loadingMessage}</p>
      ) : students.length === 200 ? (
        <p>No records found.</p>
      ) : (

        <View>
          <Header />
          <Navbar /> 
          <h1>Favourites students in your course</h1>
          <CardContainer>
            {students.map((student) => {
              return (
                <div class="studentcards">
                  <>
                    <CustomBorderCard
                      affinityID={student.UserLikeAffinityID}
                      key={student.UserID}
                    >
                      <studentCards>
                        <p>{student.UserEmail.substring(0, 8)}</p>
                        <p>{`${student.UserFirstname} ${student.UserLastname}`}</p>
                        <img
                          class="img"
                          src={student.UserImageURL}
                          alt={student.UserEmail.substring(0, 8)}
                        />
                      </studentCards>
                    </CustomBorderCard>
                  </>
                </div>
              );
            })}
          </CardContainer>
        </View>

      )}
    </>
  );
}
