import React, { useState } from "react";
import { connect } from "react-redux";
import { addCategory } from "../../redux/actions";
import styles from "./CreateCategory.module.css";

function CreateCategory({ onAddCategory }) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName) {
      onAddCategory(newCategoryName);
      setNewCategoryName("");
      setShowInput(false);
    }
  };

  return (
    <div className={styles.createCategoryContainer}>
      <button
        onClick={() => setShowInput(true)}
        className={styles.createCategoryBtn}
      >
        <div className={styles.btnContent}>
          Create Category
          <span className={styles.plusIcon}>+</span>
        </div>
      </button>
      {showInput && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Add a title"
            className={styles.inputField}
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory} className={styles.checkBtn}>
            ✓
          </button>
          <button
            onClick={() => setShowInput(false)}
            className={styles.closeBtn}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { onAddCategory: addCategory })(CreateCategory);
