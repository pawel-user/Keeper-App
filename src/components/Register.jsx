import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { addUser } from "../services/registeredUsers";

async function registerUser(newUserData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/register",
      newUserData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
    // console.log(response.data);
  } catch (error) {
    console.error("Registration error: ", error);
    throw error;
  }
}

export default function Register({ setAlert }) {
  // console.log("Users inside Register component:", users); // Logowanie users

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
    console.log("Submitting registration form with data:", userInput);
    try {
      const response = await registerUser(userInput);
      if (response) {
        // Wywołanie asynchronicznej funkcji addUser(), aby zapisać nowego użytkownika do pliku JSON
        // await addUser(userInput);
        setAlert("register", "Registration successful!");
        // Opóźnienie na 3 sekundy przed nawigacją do innej strony
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2000 milisekund = 2 sekundy
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.status === 409) {
        setAlert(
          "error",
          "This user already exists! Try login or enter other data to register"
        );
      } else if (error.response && error.response.status === 407) {
        setAlert(
          "error",
          "Empty fields detected! All input fields are required."
        );
      } else if (error.response && error.response.status === 408) {
        setAlert("error", "Invalid email format! Please try again.");
      } else {
        setAlert(
          "error",
          "Registration Failed. The user credentials are not the same! Please try again."
        );
      }
    }
  };

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
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
