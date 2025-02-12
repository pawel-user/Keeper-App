import React from "react";
import Logout from "./Logout";

import HighlightIcon from "@mui/icons-material/Highlight";

function Header(props) {

  return (
    <header>
      <h1>
        <HighlightIcon/> Keeper
      </h1>
        {props.isLoggedIn ? <Logout setLogin={props.setLogin} setToken={props.setToken} setAlert={props.setAlert} setIsEditing={props.setIsEditing} setNoteToEdit={props.setIsEditing}/> : null}
    </header>
  );
}

export default Header;
