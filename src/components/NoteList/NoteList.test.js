import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import NoteList from "./NoteList";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("NoteList Component", () => {
  let store;
  let initialState;
  let mockOnSelectNote;

  beforeEach(() => {
    initialState = {
      notesData: {
        categories: [
          {
            id: "1",
            name: "Work",
            notes: [{ id: "n1", title: "Work Note 1", content: "Content 1" }],
          },
          {
            id: "2",
            name: "Personal",
            notes: [
              { id: "n2", title: "Personal Note 1", content: "Content 2" },
            ],
          },
        ],
        selectedCategoryId: null,
        searchQuery: "",
      },
    };
    store = mockStore(initialState);
    mockOnSelectNote = jest.fn();
  });

  test("renders NoteList with notes from all categories", () => {
    render(
      <Provider store={store}>
        <NoteList onSelectNote={mockOnSelectNote} />
      </Provider>
    );

    // Check if notes from all categories are displayed
    expect(screen.getByText(/Work Note 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal Note 1/i)).toBeInTheDocument();
  });

  test("renders NoteList with notes from a specific category", () => {
    store = mockStore({
      ...initialState,
      notesData: {
        ...initialState.notesData,
        selectedCategoryId: "1", // Selecting 'Work' category
      },
    });

    render(
      <Provider store={store}>
        <NoteList onSelectNote={mockOnSelectNote} />
      </Provider>
    );

    // Check if only notes from the 'Work' category are displayed
    expect(screen.getByText(/Work Note 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Personal Note 1/i)).not.toBeInTheDocument();
  });

  test("renders NoteList based on search query", () => {
    store = mockStore({
      ...initialState,
      notesData: {
        ...initialState.notesData,
        searchQuery: "Personal", // Searching for 'Personal'
      },
    });

    render(
      <Provider store={store}>
        <NoteList onSelectNote={mockOnSelectNote} />
      </Provider>
    );

    // Check if only notes matching the search query are displayed
    expect(screen.queryByText(/Work Note 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Personal Note 1/i)).toBeInTheDocument();
  });

  test("handles note selection", () => {
    render(
      <Provider store={store}>
        <NoteList onSelectNote={mockOnSelectNote} />
      </Provider>
    );

    // Simulate clicking a note
    const noteItem = screen.getByText(/Work Note 1/i).closest("div");
    fireEvent.click(noteItem);

    // Check if onSelectNote was called with the correct note
    expect(mockOnSelectNote).toHaveBeenCalledWith({
      id: "n1",
      title: "Work Note 1",
      content: "Content 1",
    });
  });
});
