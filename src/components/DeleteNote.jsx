import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zoom, Fab } from "@mui/material";
import { deleteNote } from "../services/userNotes.js";
import "../EditNote.css"; // Importuj plik CSS

function DeleteNote({ note, onRemove, setAlert, cancelDelete }) {
  const [deletedNote, setDeletedNote] = useState(note);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setAlert("success", "handleSubmit called");

    try {
      const response = await deleteNote(deletedNote.id);
      if (response.status === 404) {
        setAlert("error", "Note not found!");
        return;
      }
      if (response) {
        onRemove(deletedNote.id);
        setAlert(
          "success",
          `Note with id ${deletedNote.id} was deleted successfully`
        );
      }
    } catch (error) {
      console.error("Error while removing user note:", error);
    }
  }

  function handleCancel() {
    setAlert("error", "Delete canceled");
    cancelDelete();  // Wywołaj funkcję cancelDelete przekazaną jako props
    navigate("/");
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        <h2>Delete User Note</h2>
        <p>Are you sure to delete this note?</p>
        <input
          name="section"
          value={deletedNote.section || ""}
          placeholder="Section"
          readOnly
        />
        <input
          name="url"
          value={deletedNote.url || ""}
          placeholder="URL website address"
          readOnly
        />
        <input
          name="linkTitle"
          value={deletedNote.linkTitle || ""}
          placeholder="Title of the website link"
          readOnly
        />
        <textarea
          name="description"
          value={deletedNote.description || ""}
          placeholder="Take a note..."
          rows={10}
          readOnly
        />

        <Fab
          className="fab-edit-button"
          type="submit"
          color="primary"
          aria-label="edit"
        >
          Yes
        </Fab>
        <Fab
          className="fab-edit-button"
          type="button"
          color="primary"
          aria-label="cancel"
          onClick={handleCancel}
        >
          No
        </Fab>
      </form>
    </div>
  );
}

export default DeleteNote;
