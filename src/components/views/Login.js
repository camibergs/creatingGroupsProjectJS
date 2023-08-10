import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header.js";
import "./Login.scss";
import Navbar from "../layout/Navbar"; // Import the Navbar component

function Login() {
  // Initialisation ------------------------------
  const navigate = useNavigate();

  // State ---------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(""); // Initialize loggedInUser state here

  // Handlers ------------------------------------
  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    if (email === "K2990629@kingston.ac.uk") {
      const user = email; // Store the email in a variable
      setLoggedInUser(user); // Update the loggedInUser state
      navigate("/coursemates", { state: { loggedInUser: user } }); // Pass loggedInUser through navigation state
    } else if (email === "G.Jones@kingston.ac.uk") {
      const user = "Graeme Jones"; // Store the user name in a variable
      setLoggedInUser(user); // Update the loggedInUser state
      navigate("/lecturerview", { state: { loggedInUser: user } }); // Pass loggedInUser through navigation state
    }
  };

  // View ----------------------------------------
  return (
    <>
      <Header />
      <div className="loginCard">
        <h2>Log in</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>
      </div>
      {loggedInUser && <Navbar loggedInUser={loggedInUser} />}{" "}
      {/* Render Navbar if loggedInUser is truthy */}
    </>
  );
}

export default Login;
