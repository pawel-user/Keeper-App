import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../services/registeredUsers.js";


export default function Register(props) {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userInput);
      if (response) {
        props.setAlert("register", "Registration successful!");
        // Opóźnienie na 2 sekundy przed nawigacją do innej strony
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2000 milisekund = 2 sekundy
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.status === 409) {
        props.setAlert(
          "error",
          "This user already exists! Try login or enter other data to register"
        );
      } else if (error.status === 400 && error.response.data === 'All fields are required') {
        props.setAlert(
          "error",
          "Empty fields detected! All input fields are required."
        );
      } else if (error.status === 400 && error.response.data === 'Invalid email format') {
        props.setAlert("error", "Invalid email format! Please try again.");
      } else if (error.status === 400 && error.response.data === 'User credentials failed') {
        props.setAlert(
          "error",
          "Registration Failed. The user credentials are not the same! Please try again."
        );
      }
    }
  };

  const clearInputs = (e) => {
    e.preventDefault();
    // console.log("Function clearInputs() called.");
    setUserInput({
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    });
  }
  

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up Panel</h1>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={handleChange}
            value={userInput.username}
            name="username"
            autoComplete="username"
          />
        </label>
        <label>
          <p>Email address</p>
          <input
            type="email"
            onChange={handleChange}
            value={userInput.email}
            name="email"
            autoComplete="email"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={handleChange}
            value={userInput.password}
            name="password"
            autoComplete="new-password"
          />
        </label>
        <label>
          <p>Password repeat</p>
          <input
            type="password"
            onChange={handleChange}
            value={userInput.repeatedPassword}
            name="repeatedPassword"
            autoComplete="new-password"
          />
        </label>
        <div class="button-container">
          <button type="submit">Sign up</button>
          <button onClick={clearInputs} className="clear-button">Clear</button>
        </div>
      </form>
    </div>
  );
}
