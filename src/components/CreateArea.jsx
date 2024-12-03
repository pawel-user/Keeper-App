import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

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

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      section: "",
      linkTitle: "",
      url: "",
      description: "",
    });
    event.preventDefault();
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
