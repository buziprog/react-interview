import {
  ADD_CATEGORY,
  ADD_NOTE_TO_CATEGORY,
  SET_SELECTED_CATEGORY_ID,
  SEARCH_NOTES,
} from "./actionTypes";

export const addCategory = (categoryName) => ({
  type: ADD_CATEGORY,
  payload: categoryName,
});

export const addNoteToCategory = (note, categoryId) => ({
  type: ADD_NOTE_TO_CATEGORY,
  payload: { note, categoryId },
});
export const setSelectedCategoryId = (categoryId) => ({
  type: SET_SELECTED_CATEGORY_ID,
  payload: categoryId,
});
export const searchNotes = (searchQuery) => ({
  type: SEARCH_NOTES,
  payload: searchQuery,
});
export const editNote = (updatedNote) => ({
  type: "EDIT_NOTE",
  payload: updatedNote,
});

export const deleteNote = (noteId) => ({
  type: "DELETE_NOTE",
  payload: noteId,
});
