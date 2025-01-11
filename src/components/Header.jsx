import React from "react";
import Logout from "./Logout";

import HighlightIcon from "@mui/icons-material/Highlight";

function Header({isLoggedIn, setLogin, setToken}) {

  return (
    <header>
      <h1>
        <HighlightIcon/> Keeper
      </h1>
        {!isLoggedIn ? <Logout setLogin={setLogin} setToken={setToken}/> : null}
    </header>
  );
}

export default Header;
