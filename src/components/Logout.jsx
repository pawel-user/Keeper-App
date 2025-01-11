import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LogoutIcon from "@mui/icons-material/Logout";

async function logoutUser(credentials) {
  try {
    const response = await axios.post("http://localhost:8080/logout", {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export default function Logout({ setLogin, setToken}) {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = await logoutUser();

    setLogin(false);
    setToken(token);
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
