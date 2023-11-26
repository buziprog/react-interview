import React from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <h2>Your Notes</h2>
      <button className={styles.close_btn}>x</button>
    </nav>
  );
}

export default NavBar;
