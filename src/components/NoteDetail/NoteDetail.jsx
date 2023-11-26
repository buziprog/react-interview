import React, { useState, useEffect, useRef } from "react";
import styles from "./NoteDetail.module.css";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function NoteDetail({ note, onClose, onEditNote, onDeleteNote }) {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const noteDetailRef = useRef(null);

  const handleSave = () => {
    onEditNote({ ...note, title: editedTitle, content: editedContent });
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        noteDetailRef.current &&
        !noteDetailRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={noteDetailRef} className={styles.noteDetail}>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className={styles.titleInput}
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className={styles.contentTextarea}
      />
      <div className={styles.buttonsContainer}>
        <button
          onClick={() => onDeleteNote(note.id)}
          className={styles.deleteBtn}
        >
          <p>Delete Note</p> <FaTrash />
        </button>
        <button onClick={handleSave} className={styles.saveBtn}>
          <p>Save Changes</p> <FaCheck />
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;
