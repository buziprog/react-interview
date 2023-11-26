import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NoteDetail from "./NoteDetail";

describe("NoteDetail Component", () => {
  test("renders and interacts with the NoteDetail component", () => {
    const mockNote = { id: 1, title: "Test Note", content: "Test Content" };
    const mockOnClose = jest.fn();
    const mockOnEditNote = jest.fn();
    const mockOnDeleteNote = jest.fn();

    render(
      <NoteDetail
        note={mockNote}
        onClose={mockOnClose}
        onEditNote={mockOnEditNote}
        onDeleteNote={mockOnDeleteNote}
      />
    );

    // Check if the note details are rendered
    expect(screen.getByDisplayValue(/Test Note/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Test Content/i)).toBeInTheDocument();

    // Simulate editing the note
    fireEvent.change(screen.getByDisplayValue(/Test Note/i), {
      target: { value: "Updated Test Note" },
    });
    fireEvent.change(screen.getByDisplayValue(/Test Content/i), {
      target: { value: "Updated Test Content" },
    });

    // Simulate clicking the save button
    fireEvent.click(screen.getByText(/Save Changes/i));
    expect(mockOnEditNote).toHaveBeenCalledWith({
      ...mockNote,
      title: "Updated Test Note",
      content: "Updated Test Content",
    });

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText(/Delete Note/i));
    expect(mockOnDeleteNote).toHaveBeenCalledWith(mockNote.id);

    // Simulate clicking outside the component
    fireEvent.mouseDown(document);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
