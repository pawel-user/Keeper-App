import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../services/loggedUsers.js";
import propTypes from "prop-types";

export default function Login({ setToken, setLogin, setAlert }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    return true;
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
