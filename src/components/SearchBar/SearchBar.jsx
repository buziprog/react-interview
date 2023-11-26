import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { connect } from "react-redux";
import { searchNotes } from "../../redux/actions";
import { IoSearchSharp } from "react-icons/io5";

function SearchBar({ onSearchNotes }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchNotes(query);
  };

  return (
    <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
      <IoSearchSharp className={styles.icon} />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSearchNotes: (query) => dispatch(searchNotes(query)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
