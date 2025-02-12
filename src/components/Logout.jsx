import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {logoutUser} from "../services/loggedUsers.js";
import LogoutIcon from "@mui/icons-material/Logout";
// import axios from "axios";


// async function logoutUser(token) {
//   if (!token) {
//     throw new Error("No token, user is already logged out.");
//   }
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/logout",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error while logging out:", error);
//     throw error;
//   }
// }

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
    props.setIsEditing(false); // Resetowanie stanu isEditing
    props.setNoteToEdit(null); // Resetowanie edytowanej notatki
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
