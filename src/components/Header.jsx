import React from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header(props) {
  const navigate = useNavigate();

  function handleReturnToHome() {
    props.cancelAction(); // Wywołaj funkcję cancelAction przekazaną jako props
    navigate("/");
  }

  return (
    <header>
      <h1 onClick={handleReturnToHome}>
        <HighlightIcon/> Keeper
      </h1>
        {props.isLoggedIn ? <Logout setLogin={props.setLogin} setToken={props.setToken} setAlert={props.setAlert} setIsEditing={props.setIsEditing} setNoteToEdit={props.setIsEditing} setIsDeleting={props.setIsDeleting}/> : null}
    </header>
  );
}

export default Header;
