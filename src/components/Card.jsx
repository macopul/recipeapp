import styles from "./Card.module.scss";

function Card({ recipe }) {
  return (
    <div className={styles.Card}>
      <p>{recipe.title}</p>
      <img src={recipe.image} alt={recipe.title} />
      <Gradient />
    </div>
  );
}

const Gradient = () => {
  return <div className={styles.gradient}></div>;
};

export default Card;
