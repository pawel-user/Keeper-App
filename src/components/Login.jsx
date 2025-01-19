import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./../styles-link.css";
import axios from "axios";

//First solution
// async function loginUser(credentials) {
//     try {
//         const response = await axios.post('http://localhost:8080/login');

//         // JSON.stringify(credentials);

//         console.log(response.data);
//         // return response;
//     } catch {
//         console.error(error);
//     }
// }

async function loginUser(credentials) {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      credentials,
      { headers: { "Content-Type": "application/json" } }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
export default function Login({ setToken, setLogin, setAlert }) {
  // console.log("Login component rendered"); // Dodaj log przy renderowaniu komponentu  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    // console.log(token);
    setToken(token);
    setLogin(true);
    setAlert(true);
    navigate("/");
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
};
