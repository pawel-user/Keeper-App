import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

import { Fab } from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header({setLogin, setToken}) {
  const [isLoggedOut, setLogout] = useState(true);
  const navigate = useNavigate();


  return (
    <header>
      <h1>
        <HighlightIcon/> Keeper
      </h1>
      {isLoggedOut ? <Logout setLogin={setLogin} setToken={setToken} setLogout={setLogout}/> : null}
    </header>
  );
}

export default Header;
