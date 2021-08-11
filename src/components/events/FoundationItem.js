import { Fragment, useState } from "react";
import useMoney from "../../hooks/useMoney";
import DateFormatter from "../helperFunctions/DateFormatter";
import TransactionsToDisplay from "./transactionsToDisplay/TransactionsToDisplay";

import styles from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const [editingClicked, setEditingClicked] = useState(false);
  const { name, date:oldDate, purpose, totalCostInCents, transactions } = props.foundationItem;

  const money = useMoney(totalCostInCents);
  const date = DateFormatter(oldDate);

  const clickedForFoundations = () => {
    setFoundationsClicked((previous) => !previous);
  };

  const editFoundationItemClicked = () => {
    setEditingClicked((previous) => !previous);
  };

  if (!editingClicked) {
    const deleteClicked = () => {
      props.deleteClicked(props.foundationItem);
    };

    return (
      <Fragment>
        <div className={styles.item} onClick={clickedForFoundations}>
          <div className={styles.titleDiv}>{name}</div>
          <div className={styles.dateDiv}>{date}</div>
          <div className={styles.purposeDiv}>{purpose.title}</div>
          <div
            className={styles.costDiv}
          >{`${money.dollars}.${money.cents}`}</div>
          {/* <button onClick={editEventClicked} className={styles.button}> */}
          <button onClick={deleteClicked} className={styles.button}>
            Delete
          </button>
        </div>
        {foundationsClicked && (
          <TransactionsToDisplay transactions={transactions} />
        )}
      </Fragment>
    );
  }
};

export default FoundationItem;
