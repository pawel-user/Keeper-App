import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import EditNote from "./EditNote";
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
  const [isEditing, setIsEditing] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const mounted = useRef(true);
  const fetchNotesCalled = useRef(false);

  const handleAlert = (type, message) => {
    setAlert({
      type,
      message,
      visible: true,
    });
    if (type === "noteAdded") {
      setTimeout(reloadPage, 2000); // Wywołanie funkcji reloadPage z opóźnieniem 2 sekund
    }
  };

  const reloadPage = () => {
    window.location.reload(); // Wymuszenie przeładowania strony
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
        console.error("Token is null or does not exists");
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
        try {
          // Dekodowanie tokena, aby sprawdzić czas wygaśnięcia
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token wygasł
            setToken(null);
            setLogin(false);
            setIsEditing(false); // Resetowanie stanu isEditing
            setNoteToEdit(null); // Resetowanie edytowanej notatki
            window.location.href = "/";
          } else {
            const fetchedNotes = await getNotes(token);
            if (fetchedNotes.status === 401) {
              setToken(null);
              setLogin(false);
              setIsEditing(false); // Resetowanie stanu isEditing
              setNoteToEdit(null); // Resetowanie edytowanej notatki
              window.location.href = "/";
            } else {
              setNotes(fetchedNotes);
            }
          }
        } catch (error) {
          console.error("Error decoding token or fetching notes:", error);
          setToken(null);
          setLogin(false);
          setIsEditing(false); // Resetowanie stanu isEditing
          setNoteToEdit(null); // Resetowanie edytowanej notatki
          window.location.href = "/";
        }
      }
    }

    if (isLoggedIn && token && !fetchNotesCalled.current) {
      fetchNotesCalled.current = true;
      fetchNotes();
    }
  }, [isLoggedIn, token, setToken]);

  // Update isLoggedIn when token changes
  useEffect(() => {
    setLogin(!!token);
  }, [token]);

  // Funkcja addNote
  function addNote(newNote) {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Zapisanie notatek w localStorage
      handleAlert("noteAdded", "New note added successfully!");
      return updatedNotes;
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const editNote = (id) => {
    const note = notes.find((noteItem, index) => index === id);
    setNoteToEdit(note);
    setIsEditing(true);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((noteItem, index) =>
        index === noteToEdit.id - 1 ? updatedNote : noteItem
      )
    );
    setIsEditing(false);
    setNoteToEdit(null);
  };

  return (
    <Router>
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          setToken={setToken}
          setLogin={setLogin}
          setAlert={handleAlert}
          setIsEditing={setIsEditing}
          setNoteToEdit={setNoteToEdit}
        />
        {alert.visible ? (
          <div className="main-panel-wrapper">
            <h2>{alert.message}</h2>
          </div>
        ) : null}

        {!isLoggedIn && !token ? (
          <div className="main-panel-wrapper">
            <Routes>
              <Route path="" element={<Welcome />} />
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
            {isEditing ? (
              <div>
                <EditNote note={noteToEdit} onUpdate={updateNote} />
              </div>
            ) : (
              <>
                <CreateArea onAdd={addNote} setAlert={handleAlert} />
                {notes.map((noteItem, index) => {
                  return (
                    <Note
                      key={index}
                      id={index}
                      section={noteItem.section}
                      linkTitle={noteItem.linkTitle}
                      url={noteItem.url}
                      description={noteItem.description}
                      onEdit={editNote}
                      onDelete={deleteNote}
                    />
                  );
                })}
              </>
            )}
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
