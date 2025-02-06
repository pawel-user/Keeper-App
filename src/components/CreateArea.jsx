import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

async function addNote(newNote) {
  try {
    const token = localStorage.getItem("token"); // Pobranie tokena z localStorage lub innego źródła
    const response = await axios.post(
      "http://localhost:8080/add/note",
      newNote,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Dodanie nagłówka Authorization z tokenem
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Adding new note error: ", error);
    throw error;
  }
}

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
    console.log(urlRegex);
    if (!urlRegex.test(note.url)) {
      props.setAlert(
        "error",
        "Invalid the website URL format! Please try again."
      );
      return;
    }

    try {
      const response = await addNote(note);
      if (response.status === 409) {
        props.setAlert("error", "Note with the website URL already exists!");
        return;
      }
      if (response) {
        // props.setAlert("noteAdded", "New note added successfully.");
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
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
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
          onClick={expand}
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
