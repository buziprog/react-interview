import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import SearchBar from "./SearchBar";
import { searchNotes } from "../../redux/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("SearchBar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // Add any necessary initial state here
    });

    // Mock the dispatch function
    store.dispatch = jest.fn();
  });

  test("renders SearchBar and performs a search", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Check if the search bar is rendered
    expect(screen.getByPlaceholderText(/Search notes.../i)).toBeInTheDocument();

    // Simulate typing in the search bar
    const searchInput = screen.getByPlaceholderText(/Search notes.../i);
    fireEvent.change(searchInput, { target: { value: "Test Search" } });

    // Check if the search query is updated in the input
    expect(searchInput.value).toBe("Test Search");

    // Check if the searchNotes action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(searchNotes("Test Search"));
  });
});
