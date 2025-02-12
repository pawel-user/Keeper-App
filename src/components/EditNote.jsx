import React, { useState } from "react";
import { Zoom, Fab } from "@mui/material";
import {editNote} from "../services/userNotes.js";
import EditIcon from "@mui/icons-material/Edit";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import "../EditNote.css"; // Importuj plik CSS

function EditNote({ note, onUpdate }) {
  const [isExpanded, setExpanded] = useState(false);
  const [editedNote, setEditedNote] = useState({
    section: "",
    url: "",
    linkTitle: "",
    description: "",
    ...note,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Sprawdzenie, czy wszystkie pola są wypełnione
    if (!note.section || !note.linkTitle || !note.url || !note.description) {
      props.setAlert(
        "error",
        "Empty fields detected! You need complete all input fields."
      );
      return;
    }

    // Sprawdzenie czy adres URL jest w poprawnym formacie
    const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(note.url)) {
      props.setAlert(
        "error",
        "Edited for invalid the website URL format! Please edit again."
      );
      return;
    }

        try {
          const response = await editNote(note.id, note);
          if (response.status === 404) {
            props.setAlert("error", "Note not found!");
            return;
          }
          if (response) {
            // props.setAlert("noteAdded", "New note added successfully.");
            onUpdate(editedNote);
          }
        } catch (error) {
          console.error("Error while editing user note:", error);
        }
      }

  function toggle(isExpanded) {
    setExpanded(!isExpanded);
  }

  const clearInputs = (e) => {
    e.preventDefault();
    console.log("Function clearInputs() called.");
    setEditedNote({
      section: "",
      url: "",
      linkTitle: "",
      description: ""
    });
  };

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        <h2>Edit User Note</h2>
        <input
          name="section"
          onChange={handleChange}
          value={editedNote.section || ""}
          placeholder="Section"
        />
        <input
          name="url"
          onChange={handleChange}
          value={editedNote.url || ""}
          placeholder="URL website address"
        />
        <input
          name="linkTitle"
          onChange={handleChange}
          value={editedNote.linkTitle || ""}
          placeholder="Title of the website link"
        />
        <textarea
          name="description"
          onClick={() => toggle(isExpanded)}
          onChange={handleChange}
          value={editedNote.description || ""}
          placeholder="Take a note..."
          rows={isExpanded ? 6 : 1}
        />

        <div className="fab-buttons-container">
          <Zoom in={true}>
            <Fab
              className="fab-edit-button"
              type="submit"
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </Fab>
          </Zoom>
          <Zoom in={true}>
            <Fab
              className="fab-clear-button"
              onClick={clearInputs}
              color="primary"
              aria-label="clear"
            >
              <ClearAllIcon />
            </Fab>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
