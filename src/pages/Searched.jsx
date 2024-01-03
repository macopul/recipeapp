import styles from "./Pages.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Searched() {
  const [searched, setSearched] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearched(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <div className={styles.grid}>
      {searched.map((item) => {
        return (
          <div className={styles.card} key={item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default Searched;
