import { useEffect, useState } from "react";
import styles from "./Popular.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useRecipeStorage } from "../hooks/useRecipeStorage";
// import { _ } from "lodash";
import { unionBy } from "lodash";

function Popular() {
  const [popular, setPopular] = useState([]);
  const { setRecipesInLocalStorage, getRecipesFromLocalStorage } =
    useRecipeStorage();

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`
    );
    const data = await api.json();
    setPopular(data.recipes);
    setRecipesInLocalStorage(data.recipes);
    // localStorage.setItem("popular", JSON.stringify(data));
  };

  const logRecipesFromStorage = () => {
    // const arr = [];
    const recipesInStorage = getRecipesFromLocalStorage();
    console.log(recipesInStorage);
    // recipesInStorage.forEach((element) => arr.push(element.id));
    // const toFindDuplicates = (arry) =>
    //   arry.filter((item, index) => arr.indexOf(item) !== index);
    // const duplicateElements = toFindDuplicates(arr);
    // console.log(duplicateElements);
  };

  useEffect(() => {
    // const dataFromLocalStorage = JSON.parse(localStorage.getItem("popular"));
    // if (dataFromLocalStorage) {
    //   setPopular(dataFromLocalStorage.recipes);
    //   return;
    // }
    getPopular();
  }, []);

  return (
    <div>
      <div className={styles.Wrapper}>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            mediaQuery: "min",
            breakpoints: {
              768: { perPage: 3, arrows: false },
              1080: { perPage: 4, arrows: false },
            },
            perPage: 1,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={"/recipe/" + recipe.id}>
                  <Card recipe={recipe} />
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      {/* <button onClick={() => console.log(result)}>LOG STORAGE</button> */}
      <button onClick={() => "f"}>LOG STORAGE</button>
    </div>
  );
}

export default Popular;
