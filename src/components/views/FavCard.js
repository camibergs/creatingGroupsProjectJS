import Action from '../UI/Actions.js';
import Icon from '../UI/Icons.js';
import "./FavCard.scss";

export default function FavCard({ student, children, index, get }) {
  // initialisation ----------------------------
  const loggedInUser = 277;
  const likeRecord = { LikerID: loggedInUser };
  const likeEndpoint = `http://softwarehub.uk/unibase/api/likes`;

  const postLike = async (url, likeRecord) => {
    // Build request object
    const request = {
      method: "POST",
      body: JSON.stringify(likeRecord),
      headers: { "Content-type": "application/json" },
    };
    // Call the fetch
    const response = await fetch(url, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  const putLike = async (url, likeRecord) => {
    // Build request object
    const request = {
      method: "Put",
      body: JSON.stringify(likeRecord),
      headers: { "Content-type": "application/json" },
    };

    // Call the fetch
    const response = await fetch(url, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

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
  const handlePostLike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 1;
    const result = await postLike(likeEndpoint, likeRecord);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handlePutLike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 1;
    const result = await putLike(
      `${likeEndpoint}/${student.UserLikeID}`,
      likeRecord
    );
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handlePostDislike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 2;
    const result = await postLike(likeEndpoint, likeRecord);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handlePutDislike = async (student) => {
    console.log(`you liked ${student.UserID}`);
    likeRecord.LikeeID = student.UserID;
    likeRecord.LikeAffinityID = 2;
    const result = await putLike(
      `${likeEndpoint}/${student.UserLikeID}`,
      likeRecord
    );
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  const handleReset = async (student) => {
    console.log(`you reseted ${student.UserID}`);
    console.log(`student = ${JSON.stringify(student)}`);
    const result = await deleteLike(`${likeEndpoint}/${student.UserLikeID}`);
    result.isSuccess ? get() : alert(`result: ${result.message}`);
  };

  // View --------------------------------------
  const buttonPostLike = (
    <button className="iconedbutton" onClick={() => handlePostLike(student)}>
      <div>
        <Icon.ThumbUp />
      </div>
    </button>
  );
  //<Action.Like showText buttonText="Like" onClick={() => handlePostLike(student)} />
  //<button onClick={() => handlePostLike(student)}>Like</button>

  const buttonPutLike = (
    <button className="iconedbutton" onClick={() => handlePutLike(student)}>
      <div>
        <Icon.ThumbUp />
      </div>
    </button>
  );
  const buttonPostDislike = (
    <button className="iconedbutton" onClick={() => handlePostDislike(student)}>
      <div>
        <Icon.ThumbDown />
      </div>
    </button>
  );
  const buttonPutDislike = (
    <button className="iconedbutton" onClick={() => handlePutDislike(student)}>
      <div>
        <Icon.ThumbDown />
      </div>
    </button>
  );
  const buttonReset = (
    <button className="iconedbutton" onClick={() => handleReset(student)}>
      <div>
        <Icon.Reset />
      </div>
    </button>

  );

  let buttons = null;
  if (student.UserLikeAffinityID === 1)
    buttons = (
      <Action.Tray>
        {buttonPutLike}
        {buttonReset}
      </Action.Tray>
      
    );
  else if (student.UserLikeAffinityID === 2)
    buttons = (
      <Action.Tray>
        {buttonPutDislike}
        {buttonReset}
      </Action.Tray>
    );
  else if (student.UserLikeAffinityID === null)
    buttons = (
      <Action.Tray>
        {buttonPostLike}
        {buttonPostDislike}
      </Action.Tray>
    );
  else;

  return (
    <div className="buttons">
      {children}
      {buttons}
    </div>
  );
}
