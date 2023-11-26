import {
  ADD_CATEGORY,
  ADD_NOTE_TO_CATEGORY,
  SET_SELECTED_CATEGORY_ID,
  SEARCH_NOTES,
} from "../actions/actionTypes";

const initialState = {
  originalCategories: [], // Store original categories and notes
  categories: [], // This will hold search results or the full list
  selectedCategoryId: null,
  searchQuery: "", // Added to track the current search query
};

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      const newCategory = {
        id: state.originalCategories.length + 1,
        name: action.payload,
        notes: [],
      };
      return {
        ...state,
        originalCategories: [newCategory, ...state.originalCategories],
        categories: [newCategory, ...state.originalCategories],
      };

    case ADD_NOTE_TO_CATEGORY:
      const updatedOriginalCategories = state.originalCategories.map(
        (category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                notes: [...category.notes, { ...action.payload.note }],
              }
            : category
      );
      return {
        ...state,
        originalCategories: updatedOriginalCategories,
        categories: updatedOriginalCategories,
      };

    case SET_SELECTED_CATEGORY_ID:
      return {
        ...state,
        selectedCategoryId: action.payload,
      };

    case SEARCH_NOTES:
      const searchQuery = action.payload.trim();
      if (!searchQuery) {
        return { ...state, categories: state.originalCategories, searchQuery };
      }
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredCategories = state.originalCategories
        .map((category) => {
          const filteredNotes = category.notes.filter(
            (note) =>
              note.title.toLowerCase().includes(lowerCaseQuery) ||
              note.content.toLowerCase().includes(lowerCaseQuery)
          );
          return filteredNotes.length > 0
            ? {
                ...category,
                notes: filteredNotes,
              }
            : null;
        })
        .filter((category) => category !== null);

      return { ...state, categories: filteredCategories, searchQuery };
    case "EDIT_NOTE":
      return {
        ...state,
        originalCategories: state.originalCategories.map((category) => ({
          ...category,
          notes: category.notes.map((note) =>
            note.id === action.payload.id ? { ...action.payload } : note
          ),
        })),
        categories: state.categories.map((category) => ({
          ...category,
          notes: category.notes.map((note) =>
            note.id === action.payload.id ? { ...action.payload } : note
          ),
        })),
      };

    case "DELETE_NOTE":
      const newOriginalCategories = state.originalCategories.map((category) => {
        return {
          ...category,
          notes: category.notes.filter((note) => note.id !== action.payload),
        };
      });

      return {
        ...state,
        originalCategories: newOriginalCategories,
        categories: newOriginalCategories,
      };

    default:
      return state;
  }
}

export default notesReducer;
