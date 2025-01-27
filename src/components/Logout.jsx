import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";

async function logoutUser(token) {
  if (!token) {
    throw new Error("Brak tokena, użytkownik już jest wylogowany.");
  }
  try {
    // Dodaj logowanie tokena
    console.log("Token przed wysłaniem żądania wylogowania:", token); 
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
    console.error("Błąd podczas wylogowywania:", error);
    throw error;
  }
}

export default function Logout({ setLogin, setToken }) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Brak tokena, użytkownik już jest wylogowany.");
      return;
    }
    await logoutUser(token);
    setLogin(false);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
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
