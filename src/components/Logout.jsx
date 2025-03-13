import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/loggedUsers.js";
import LogoutIcon from "@mui/icons-material/Logout";

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
    props.setIsEditing(false);
    props.setNoteToEdit(null);
    props.setAlert("success", "Logout successful");
    props.setContent("start");
    navigate("/");
    return true;
  };

  return (
    <h2>
      <button
        variant="contained"
        onClick={handleLogout}
        className="logout-button"
      >
        <LogoutIcon />
      </button>
    </h2>
  );
}
