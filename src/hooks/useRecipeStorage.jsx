import _ from "lodash";

export const useRecipeStorage = () => {
  const getRecipesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  };

  const setRecipesInLocalStorage = (recipes) => {
    const recipesInLocalStorage = getRecipesFromLocalStorage();
    const newRecipes = _.unionBy(recipesInLocalStorage, recipes, "id");
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    const actualRecipesInLocalStorage = getRecipesFromLocalStorage();
    console.log(actualRecipesInLocalStorage);
  };

  return {
    getRecipesFromLocalStorage,
    setRecipesInLocalStorage,
  };
};
