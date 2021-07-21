import styles from "./PossibleFoundationsList.module.css";

const PossibleFoundationsList = (props) => {
  const adjustedList = props.list.map((foundation) => {
    const dollars = ~~(foundation.leftOverPennies / 100);
    const leftOvers = foundation.leftOverPennies % 100;
    const money = { dollars, cents: leftOvers === 0 ? "00" : leftOvers };

    return {...foundation, money }
  });

  const foundationsToDiplay = adjustedList.map((foundation) => (
    <li className={styles.listItem} key={foundation.id} >
      <div className={styles.name}>{foundation.name}</div>
      <div className={styles.moneyDiv}>{`${foundation.money.dollars}.${foundation.money.cents}`}</div>
      <input placeholder={"$"}></input>
    </li>
  ));

  return <ul>{foundationsToDiplay}</ul>;
};

export default PossibleFoundationsList;
