import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSelectedCategoryId } from "../../redux/actions";
import styles from "./NoteList.module.css";

function NoteList({
  categories,
  selectedCategoryId,
  searchQuery,
  onSelectNote,
  dispatch,
  isNoteDetailOpen,
}) {
  let notesToDisplay = [];

  // Clear the selected category when a search is initiated
  useEffect(() => {
    if (searchQuery) {
      dispatch(setSelectedCategoryId(null));
    }
  }, [searchQuery, dispatch]);

  if (selectedCategoryId === "all-notes") {
    // Aggregate all notes for "All Notes" category
    notesToDisplay = categories.flatMap((category) => category.notes);
  } else if (selectedCategoryId) {
    // Display notes from the selected category
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    if (selectedCategory) {
      notesToDisplay = selectedCategory.notes;
    }
  } else if (searchQuery) {
    // Filter notes based on the search query
    const lowerCaseQuery = searchQuery.toLowerCase();
    notesToDisplay = categories.flatMap((category) => {
      return category.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerCaseQuery) ||
          note.content.toLowerCase().includes(lowerCaseQuery)
      );
    });
  } else {
    // Display all notes if there is no selected category or search query
    notesToDisplay = categories.flatMap((category) => category.notes);
  }
  const truncateLength = isNoteDetailOpen ? 40 : 130; // the trunctation

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={styles.noteList}>
      {notesToDisplay.length > 0 ? (
        notesToDisplay.map((note, index) => (
          <div
            key={index}
            className={styles.noteItem}
            onClick={() => onSelectNote(note)}
          >
            <h3>{note.title}</h3>
            <p>{truncateText(note.content, truncateLength)}</p>
          </div>
        ))
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.notesData.categories,
  selectedCategoryId: state.notesData.selectedCategoryId,
  searchQuery: state.notesData.searchQuery,
});

export default connect(mapStateToProps)(NoteList);
