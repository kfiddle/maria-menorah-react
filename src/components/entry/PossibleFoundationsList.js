import styles from "./PossibleFoundationsList.module.css";

const PossibleFoundationsList = (props) => {
  const foundationsToDiplay = props.list.map((foundation) => (
    <li key={foundation.id} className={styles.listItem}>
      <div>{foundation.name}</div>
      <div>{foundation.leftOverPennies}</div>
      <input placeholder={'$$$'}></input>
    </li>
  ));

  return <ul>{foundationsToDiplay}</ul>;
};

export default PossibleFoundationsList;
