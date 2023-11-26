import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CategoryList from "./components/CategoryList/CategoryList";
import NoteList from "./components/NoteList/NoteList";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import CreateNote from "./components/CreateNote/CreateNote";
import NoteDetail from "./components/NoteDetail/NoteDetail";
import { editNote, deleteNote, setSelectedCategoryId } from "./redux/actions";

function App({
  dispatch,
  selectedCategoryId,
  categories,
  searchQuery,
  onEditNote,
  onDeleteNote,
}) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const isNoteDetailOpen = selectedNote != null;

  useEffect(() => {
    setShowCreateForm(false); // Hide create form on search
  }, [searchQuery]);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };
  const handleSelectCategory = (categoryId) => {
    dispatch(setSelectedCategoryId(categoryId));
  };

  const handleSaveChanges = (editedNote) => {
    onEditNote(editedNote);
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId) => {
    onDeleteNote(noteId);
    setSelectedNote(null);
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <aside className="sidebar">
          <CreateCategory />
          <CategoryList />
        </aside>
        <main
          className={`main-content ${
            isNoteDetailOpen ? "noteDetailOpen" : "noteDetailClosed"
          }`}
        >
          <div className="note-creation-tools">
            <CreateNote
              selectedCategory={categories.find(
                (category) => category.id === selectedCategoryId
              )}
              onShowForm={() => setShowCreateForm(true)}
              onHideForm={() => setShowCreateForm(false)}
            />
            {!showCreateForm && (
              <NoteList
                onSelectNote={handleSelectNote}
                onSelectCategory={handleSelectCategory}
                isNoteDetailOpen={isNoteDetailOpen}
              />
            )}
          </div>

          {selectedNote && (
            <NoteDetail
              note={selectedNote}
              onClose={() => setSelectedNote(null)}
              onEditNote={handleSaveChanges}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedCategoryId: state.notesData.selectedCategoryId,
  categories: state.notesData.categories,
  searchQuery: state.notesData.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
  onEditNote: (note) => dispatch(editNote(note)),
  onDeleteNote: (noteId) => dispatch(deleteNote(noteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
