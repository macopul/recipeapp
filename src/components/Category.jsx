import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styles from "./Category.module.scss";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

function Category() {
  return (
    <div className={styles.categoryList}>
      <NavLink className={styles.navLink} to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink className={styles.navLink} to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink className={styles.navLink} to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink className={styles.navLink} to={"/cuisine/Chinese"}>
        <GiChopsticks />
        <h4>Chinese</h4>
      </NavLink>
    </div>
  );
}

export default Category;
