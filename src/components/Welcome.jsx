import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Fab } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

export default function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Keeper App!</h1>
      <div className="container">
        <div className="left">
          <h2>Register</h2>
          <Fab>
            <Link
              component={Link}
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <AppRegistrationIcon />
            </Link>
          </Fab>
        </div>
        <div className="right">
          <h2>Sign In</h2>
          <Fab>
            <Link
              component={Link}
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleLogin}
            >
              <LoginIcon />
            </Link>
          </Fab>
        </div>
      </div>
    </div>
  );
}
