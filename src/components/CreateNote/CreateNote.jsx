import React, { useState } from "react";
import { connect } from "react-redux";
import { addNoteToCategory } from "../../redux/actions";
import styles from "./CreateNote.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { FaCheck } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function CreateNote({
  selectedCategory,
  onAddNoteToCategory,
  onShowForm,
  onHideForm,
}) {
  const [showForm, setShowForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleSaveNote = () => {
    if (selectedCategory && noteTitle && noteContent) {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        content: noteContent,
      };
      onAddNoteToCategory(newNote, selectedCategory.id);
      setNoteTitle("");
      setNoteContent("");
      handleCloseForm();
    }
  };

  const handleOpenForm = () => {
    setShowForm(true);
    onShowForm();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    onHideForm();
  };

  return (
    <div className={styles.createNoteContainer}>
      <div className={styles.topBar}>
        <button onClick={handleOpenForm} className={styles.createNoteBtn}>
          <div className={styles.btnContent}>
            Create Note
            <span className={styles.plusIcon}>+</span>
          </div>
        </button>
        <SearchBar />
      </div>

      {showForm && (
        <div className={styles.noteForm}>
          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className={styles.noteInput}
          />
          <textarea
            placeholder="Write your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className={styles.noteTextarea}
          />
          <div className={styles.formButtons}>
            <button onClick={handleCloseForm} className={styles.cancelBtn}>
              <span>Back</span>
              <FaArrowLeft />
            </button>
            <button onClick={handleSaveNote} className={styles.saveBtn}>
              <span>Save Changes</span>
              <FaCheck />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onAddNoteToCategory: (note, categoryId) =>
    dispatch(addNoteToCategory(note, categoryId)),
});

export default connect(null, mapDispatchToProps)(CreateNote);
