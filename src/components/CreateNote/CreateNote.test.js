import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CreateNote from "./CreateNote";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("CreateNote Component", () => {
  let store;
  const selectedCategory = { id: "1", name: "Work" };
  const mockOnShowForm = jest.fn();
  const mockOnHideForm = jest.fn();

  beforeEach(() => {
    store = mockStore({
      notesData: {
        originalCategories: [],
        categories: [],
        selectedCategoryId: null,
        searchQuery: "",
      },
    });
  });

  test("renders CreateNote component and dispatches ADD_NOTE_TO_CATEGORY action", async () => {
    render(
      <Provider store={store}>
        <CreateNote
          selectedCategory={selectedCategory}
          onShowForm={mockOnShowForm}
          onHideForm={mockOnHideForm}
        />
      </Provider>
    );

    // Open form
    fireEvent.click(screen.getByText(/Create Note/i));

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Note Title/i), {
      target: { value: "Test Note Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Write your note here.../i), {
      target: { value: "Test Note Content" },
    });

    fireEvent.click(screen.getByText(/Save Changes/i));

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual("ADD_NOTE_TO_CATEGORY");
      expect(actions[0].payload).toEqual({
        note: {
          id: expect.any(Number),
          title: "Test Note Title",
          content: "Test Note Content",
        },
        categoryId: selectedCategory.id,
      });
    });
  });
});
