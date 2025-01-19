import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Welcome from "./Welcome";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import useToken from "./useToken";

import { getUsers } from "../services/registeredUsers.js";

function App() {
  const [alert, setAlert] = useState(false);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const { token, setToken } = useToken();
  const [isLoggedIn, setLogin] = useState(false);
  // const [isLoggedOut, setLogout] = useState(true);

  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (!alert) {
      // console.log(users);
      return;
    }
    getUsers().then((userItems) => {
      console.log("User Items: ", userItems);
      if (mounted.current) {
        setUsers(userItems || []); // Ustaw domyślną wartość jako pustą tablicę
        console.log("Users after setting state:", userItems);      
      }
    });
    return () => (mounted.current = false);
  }, [alert]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 2000);
    }
  }, [alert]);

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
        <Header
          isLoggedIn={isLoggedIn}
          setToken={setToken}
          setLogin={setLogin}
        />
        {!isLoggedIn && !token ? (
          <div className="main-panel-wrapper">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/login"
                element={<Login setToken={setToken} setLogin={setLogin} setAlert={setAlert} />}
              />
            </Routes>
          </div>
        ) : (
          <div>
            {alert ? (
              <div className="main-panel-wrapper"> 
                <h2> Login Successful</h2> 
              </div>) : null}
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
