import React, { useState } from "react";
import { addNote } from "../services/userNotes.js";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import { Zoom } from "@mui/material";
import { Fab } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    section: "",
    linkTitle: "",
    url: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();
    // Sprawdzenie, czy wszystkie pola są wypełnione
    if (!note.section || !note.linkTitle || !note.url || !note.description) {
      props.setAlert(
        "error",
        "Empty fields detected! All input fields are required."
      );
      return;
    }

    // Sprawdzenie czy adres URL jest w poprawnym formacie
    const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(note.url)) {
      props.setAlert(
        "error",
        "Invalid the website URL format! Please try again."
      );
      return;
    }

    try {
      const response = await addNote(note);
      if (response.status === 201) {
        props.onAdd(note);
        setNote({
          section: "",
          linkTitle: "",
          url: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error while adding new user note:", error);
      if (error.response && error.response.status === 400 && error.response.data.message === "Note with the website URL already exists") {
        props.setAlert("error", "Note with the website URL already exists!");
      } else {
        props.setAlert("error", "Error while adding new user note. Please try again.");
      }    }
  }

  function expand() {
    setExpanded(true);
  }

  function toggle(isExpanded) {
    setExpanded(!isExpanded);
  }

  function toggleClearAndCancel() {
    setExpanded(false);
    setNote({
      section: "",
      url: "",
      linkTitle: "",
      description: ""
    });
    props.cancelAction();
  }

  const clearInputs = (e) => {
    e.preventDefault();
    setNote({
      section: "",
      url: "",
      linkTitle: "",
      description: ""
    });
  };



  return (
    <div className="create-note-area">
      <form className="create-note">
        {isExpanded ? (
          <input
            name="section"
            onChange={handleChange}
            value={note.section}
            placeholder="Section"
          />
        ) : null}

        {isExpanded ? (
          <input
            name="url"
            onChange={handleChange}
            value={note.url}
            placeholder="URL website address"
          />
        ) : null}

        {isExpanded ? (
          <input
            name="linkTitle"
            onChange={handleChange}
            value={note.linkTitle}
            placeholder="Title of the website link"
          />
        ) : null}

        <textarea
          name="description"
          onClick={() => expand()}
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 6 : 1}
        />
        <div className="fab-buttons-container2">
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
          <Zoom in={isExpanded}>
            <Fab onClick={toggleClearAndCancel}>
              <CloseIcon />
            </Fab>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
