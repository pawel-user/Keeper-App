import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import propTypes from "prop-types";

async function loginUser(credentials, setAlert) {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      credentials,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response && error.response.status === 401) {
      setAlert("error", "Login Failed. Invalid credentials.");
    } else {
      setAlert("error", "Login Failed. Please try again later.");
    }
    throw error;
  }
}

export default function Login({ setToken, setLogin, setAlert }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with credentials:", { username, password }); // Dodaj logowanie    
    try {
      const token = await loginUser(
        {
          username,
          password,
        },
        setAlert
      );
      setToken(token);
      setLogin(true);
      setAlert("login", "Login Successful");
      navigate("/");
    } catch (error) {
      // `setAlert` is already called in `loginUser` in case of error
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Log In Panel</h1>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(event) => setUserName(event.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: propTypes.func.isRequired,
  setLogin: propTypes.func.isRequired, 
  setAlert: propTypes.func.isRequired,
};
