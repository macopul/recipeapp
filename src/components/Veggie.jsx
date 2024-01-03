import { useEffect, useState } from "react";
import styles from "./Popular.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import Card from "./Card";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const { setRecipesInLocalStorage } = useRecipeStorage();
  console.log("veggie");

  const getVeggie = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegetarian`
    );
    const data = await api.json();
    setVeggie(data.recipes);
    setRecipesInLocalStorage(data.recipes);
  };

  useEffect(() => {
    getVeggie();
  }, []);

  return (
    <div>
      <div className={styles.Wrapper}>
        <h3>Veggie Picks</h3>
        <Splide
          options={{
            mediaQuery: "min",
            breakpoints: {
              768: { perPage: 2, arrows: false },
              1080: { perPage: 3, arrows: false },
            },
            perPage: 1,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {veggie.map((recipe) => {
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
    </div>
  );
}

export default Veggie;
