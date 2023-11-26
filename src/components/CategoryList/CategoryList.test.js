import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import CategoryList from "./CategoryList";
import * as actions from "../../redux/actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../redux/actions", () => ({
  setSelectedCategoryId: jest.fn(),
}));

describe("CategoryList Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notesData: {
        categories: [
          { id: "1", name: "Work", notes: [{ id: "n1", title: "Note 1" }] },
          { id: "2", name: "Personal", notes: [{ id: "n2", title: "Note 2" }] },
        ],
      },
    });

    actions.setSelectedCategoryId.mockImplementation((id) => ({
      type: "SET_SELECTED_CATEGORY_ID",
      payload: id,
    }));
  });

  test("renders CategoryList with 'All Notes' category", () => {
    render(
      <Provider store={store}>
        <CategoryList />
      </Provider>
    );

    expect(screen.getByText(/All Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal/i)).toBeInTheDocument();
  });

  test("selects a category, dispatches action, and applies correct style", () => {
    render(
      <Provider store={store}>
        <CategoryList />
      </Provider>
    );

    const personalCategory = screen.getByText(/Personal/i).closest("div");
    fireEvent.click(personalCategory);

    expect(actions.setSelectedCategoryId).toHaveBeenCalledWith("2");

    expect(personalCategory).toHaveClass("selected");
  });

  test("displays the correct number of notes for each category", () => {
    render(
      <Provider store={store}>
        <CategoryList />
      </Provider>
    );

    expect(screen.getByText(/All Notes \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Work \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal \(1\)/i)).toBeInTheDocument();
  });
});
