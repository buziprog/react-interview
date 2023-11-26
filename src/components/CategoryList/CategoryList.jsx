import React, { useState } from "react";
import { connect } from "react-redux";
import { setSelectedCategoryId } from "../../redux/actions";
import styles from "./CategoryList.module.css";
import { FaFolder } from "react-icons/fa";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";

function CategoryList({ categories, dispatch }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategoryId(category.id));
    setSelectedCategory(category.id);
  };

  // Aggregate all notes for the "All Notes" category
  const allNotes = categories.flatMap((category) => category.notes);

  const allNotesCategory = {
    id: "all-notes",
    name: "All Notes",
    notes: allNotes,
  };

  return (
    <div className={styles.categoryList}>
      <div
        key={allNotesCategory.id}
        className={`${styles.categoryItem} ${
          selectedCategory === allNotesCategory.id ? styles.selected : ""
        }`}
        onClick={() => handleSelectCategory(allNotesCategory)}
      >
        <span className={styles.folderIcon}>
          <FaFolder />
        </span>
        <h3
          style={{
            color:
              selectedCategory === allNotesCategory.id ? "#323338" : "inherit",
          }}
        >
          {allNotesCategory.name} ({allNotesCategory.notes.length})
        </h3>
        <span className={styles.triangleIcon}>
          {selectedCategory === allNotesCategory.id ? (
            <GoTriangleDown />
          ) : (
            <GoTriangleRight />
          )}
        </span>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          className={`${styles.categoryItem} ${
            selectedCategory === category.id ? styles.selected : ""
          }`}
          onClick={() => handleSelectCategory(category)}
        >
          <span className={styles.folderIcon}>
            <FaFolder />
          </span>
          <h3
            style={{
              color: selectedCategory === category.id ? "#323338" : "inherit",
            }}
          >
            {category.name} ({category.notes.length})
          </h3>
          <span className={styles.triangleIcon}>
            {selectedCategory === category.id ? (
              <GoTriangleDown />
            ) : (
              <GoTriangleRight />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.notesData.categories,
});

export default connect(mapStateToProps)(CategoryList);
