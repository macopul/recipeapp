import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.Logo}>
      <NavLink className={styles.NavLink} to={"/"}>
        <h3>Best</h3>
        <div className={styles.imageWrapper}></div>
        <h3>Food</h3>
      </NavLink>
    </div>
  );
}

export default Logo;
