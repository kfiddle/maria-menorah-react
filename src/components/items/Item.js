import styles from "./Item.module.css";
const Item = (props) => {
  const { name, date, totalCostInCents, notes, completed } = props.item;

  return <div className={styles.outerContainer}>{name}</div>;
};

export default Item;
