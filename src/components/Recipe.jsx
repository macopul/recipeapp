import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Recipe.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  let params = useParams();

  const [active, setActive] = useState("instructions");

  const getRecipeFromLocalStorage = (id) => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));
    const searchedRecipeFromLocalStorage = storedRecipes.find(
      (item) => item.id == id
    );
    return searchedRecipeFromLocalStorage;
  };

  const getRecipeFromApi = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const searchedRecipeFromApi = await data.json();
    return searchedRecipeFromApi;
  };

  useEffect(() => {
    const recipeFromLocalStorage = getRecipeFromLocalStorage(params.id);
    if (recipeFromLocalStorage) {
      setRecipe(recipeFromLocalStorage);
      return;
    }
    const recipeFromApi = getRecipeFromApi(params.id);
    setRecipe(recipeFromApi);
  }, [params]);

  return (
    <div className={styles.Recipe}>
      <div className={styles.imageWrapper}>
        <img src={recipe.image} alt="" />
      </div>
      <div>
        <div className={styles.buttonSection}>
          <button
            onClick={() => setActive("instructions")}
            className={active === "instructions" ? styles.active : ""}
          >
            Instructions
          </button>
          <button
            onClick={() => setActive("ingredients")}
            className={active === "ingredients" ? styles.active : ""}
          >
            Ingredients
          </button>
        </div>
        {active === "instructions" && (
          <div className={styles.description}>
            <div className={styles.usefulDetails}>
              <div>
                <AiOutlineLike />
                <h3>{recipe.aggregateLikes}</h3>
              </div>
              <div>
                <BsFillPersonFill />
                <h3>{recipe.servings}</h3>
              </div>
              <div>
                <FaClockRotateLeft />
                <h3>{recipe.readyInMinutes}</h3>
              </div>
            </div>
            <h2>{recipe.title}</h2>
            <div className={styles.summary}>
              <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            </div>

            <div className={styles.instruction}>
              <h2>How to prepare this Delicious Dish</h2>
              <h3
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></h3>
            </div>
          </div>
        )}
        {active === "ingredients" && (
          <div className={styles.ingredients}>
            <ul>
              {recipe.extendedIngredients?.map((item) => (
                <li key={item.name}>{item.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipe;
