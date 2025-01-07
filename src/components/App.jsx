import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Dashboard from "./Dashboard";
import Preferences from "./Preferences";
import Login from "./Login";
import useToken from "./useToken";

import { Fab } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

function Welcome() {
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
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button variant="contained">
                {" "}
                <AppRegistrationIcon />{" "}
              </button>
            </Link>
          </Fab>
        </div>
        <div className="right">
          <h2>Sign In</h2>
          <Fab>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button variant="contained" onClick={handleLogin}>
                {" "}
                <LoginIcon />{" "}
              </button>
            </Link>
          </Fab>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([]);
  const { token, setToken } = useToken();
  const [isLogged, setLogin] = useState(false);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <Router>
      <div>
        <Header />
        {!isLogged ? (
          <div className="main-panel-wrapper">
            <Routes>
              <Route path="/" element={<Welcome />} />
              {/* <Route path="/preferences" element={<Preferences />} /> */}
              <Route
                path="/login"
                element={<Login setToken={setToken} setLogin={setLogin} />}
              />
            </Routes>
          </div>
        ) : (
          <div>
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  section={noteItem.section}
                  linkTitle={noteItem.linkTitle}
                  url={noteItem.url}
                  description={noteItem.description}
                  onDelete={deleteNote}
                />
              );
            })}
          </div>
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;

{
  /* <Login setToken={setToken} /> */
}
