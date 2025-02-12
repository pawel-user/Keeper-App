import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  const navigate = useNavigate();
  
  function handleEditClick(event) {
    navigate("/note/edit");

    event.preventDefault();

    props.onEdit(props.id);
  }
  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  const url = `${props.url}`;

  return (
    <div className="note">
      <h1>{props.section}</h1>
      <a href={url}>{props.linkTitle}</a>
      <p>{props.description}</p>
      <button onClick={handleDeleteClick}>
        <DeleteIcon />
      </button>
      <Link
        component={Link}
        to="/note/edit"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={handleEditClick}
      >
        <button onClick={handleEditClick}>
          <EditNoteIcon />
        </button>
      </Link>
    </div>
  );
}

export default Note;
