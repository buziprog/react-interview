import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import CreateCategory from "./CreateCategory";
import * as actions from "../../redux/actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("../../redux/actions", () => ({
  addCategory: jest.fn(),
}));

describe("CreateCategory Component Tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});

    actions.addCategory.mockImplementation((categoryName) => ({
      type: "ADD_CATEGORY",
      payload: categoryName,
    }));
  });

  test("renders create category button and opens input field on click", () => {
    render(
      <Provider store={store}>
        <CreateCategory />
      </Provider>
    );
    const createButton = screen.getByRole("button", {
      name: /create category/i,
    });
    fireEvent.click(createButton);
    expect(screen.getByPlaceholderText(/add a title/i)).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument(); // Check button
    expect(screen.getByText("X")).toBeInTheDocument(); // Close button
  });

  test("adds a new category when the check button is clicked", () => {
    render(
      <Provider store={store}>
        <CreateCategory />
      </Provider>
    );
    const createButton = screen.getByRole("button", {
      name: /create category/i,
    });
    fireEvent.click(createButton);
    const inputField = screen.getByPlaceholderText(/add a title/i);
    const checkButton = screen.getByText("✓");

    fireEvent.change(inputField, { target: { value: "New Category" } });
    fireEvent.click(checkButton);

    expect(actions.addCategory).toHaveBeenCalledWith("New Category");
  });

  test("hides input field and buttons when the close button is clicked", () => {
    render(
      <Provider store={store}>
        <CreateCategory />
      </Provider>
    );
    const createButton = screen.getByRole("button", {
      name: /create category/i,
    });
    fireEvent.click(createButton);
    const closeButton = screen.getByText("X");

    fireEvent.click(closeButton);
    expect(screen.queryByPlaceholderText(/add a title/i)).toBeNull();
    expect(screen.queryByText("✓")).toBeNull();
    expect(screen.queryByText("X")).toBeNull();
  });
});
