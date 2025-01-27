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
import { getNotes } from "../services/userNotes.js";

function App() {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    visible: false,
  });
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const { token, setToken } = useToken();
  const [isLoggedIn, setLogin] = useState(!!token);
  const mounted = useRef(true);

  const handleAlert = (type, message) => {
    setAlert({
      type,
      message,
      visible: true,
    });
  };

  useEffect(() => {
    mounted.current = true;
    if (!alert.visible) {
      return;
    }
    if (alert.type === "login" || alert.type === "register") {
      getUsers().then((userItems) => {
        if (mounted.current) {
          setUsers(userItems || []);
        }
      });
      if (token) {
        getNotes(token).then((userNotes) => {
          if (mounted.current) {
            setNotes(userNotes || []);
          }
        });
      } else {
        console.error("Token jest null lub nie istnieje");
      }
    }
    return () => (mounted.current = false);
  }, [alert]);

  useEffect(() => {
    if (alert.visible) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert((prevAlert) => ({
            ...prevAlert,
            visible: false,
          }));
        }
      }, 2000);
    }
  }, [alert]);

  useEffect(() => {
    async function fetchNotes() {
      if (token) {
        const fetchedNotes = await getNotes(token);
        setNotes(fetchedNotes);
      }
    }
    fetchNotes();
  }, [token]);

  // Update isLoggedIn when token changes
  useEffect(() => {
    setLogin(!!token);
  }, [token]);

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
        {alert.visible ? (
          <div className="main-panel-wrapper">
            <h2>{alert.message}</h2>
          </div>
        ) : null}

        {!isLoggedIn && !token ? (
          <div className="main-panel-wrapper">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/register"
                element={<Register setAlert={handleAlert} />}
              />
              <Route
                path="/login"
                element={
                  <Login
                    setToken={setToken}
                    setLogin={setLogin}
                    setAlert={handleAlert}
                  />
                }
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
