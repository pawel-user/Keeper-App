import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import useToken from "./useToken";


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
        <Header setLogin={setLogin} setToken={setToken}/>
        {!isLogged && !token ? (
          <div className="main-panel-wrapper">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
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
