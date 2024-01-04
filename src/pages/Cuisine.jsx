import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Pages.module.scss";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCouisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCouisine(params.type);
  }, [params.type]);

  return (
    <div className={styles.grid}>
      {cuisine.map((item) => {
        return (
          <Link key={item.id} to={"/recipe/" + item.id}>
            <div className={styles.card} key={item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Cuisine;
