import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

async function logoutUser(token) {
  if (!token) {
    throw new Error("No token, user is already logged out.");
  }
  try {
    // Dodaj logowanie tokena
    // console.log("Token przed wysłaniem żądania wylogowania:", token); 
    const response = await axios.post(
      "http://localhost:8080/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while logging out:", error);
    throw error;
  }
  return true;
}

export default function Logout(props) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token, user is already logged out.");
      return;
    }
    await logoutUser(token);
    props.setLogin(false);
    props.setToken("");
    localStorage.removeItem("token");
    props.setAlert("logout", "Logout successful");
    navigate("/");
    return true;
  };

  return (
    <h2>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <button variant="contained" onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </Link>
    </h2>
  );
}
