import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.scss";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    navigate("/searched/" + input);
    e.preventDefault();
  };

  return (
    <form className={styles.Search} onSubmit={submitHandler}>
      <FaSearch />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </form>
  );
}

export default Search;
