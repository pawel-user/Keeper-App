import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  const url = `${props.url}`;

  // console.log(url);

  return (
    <div className="note">
      <h1>{props.section}</h1>
      <a href={url}>{props.linkTitle}</a>
      <p>{props.description}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
