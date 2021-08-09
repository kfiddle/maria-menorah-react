import { Fragment, useState } from "react";
import useMoney from "../../hooks/useMoney";
import DateFormatter from "../helperFunctions/DateFormatter";
import TransactionsToDisplay from "./transactionsToDisplay/TransactionsToDisplay";

import styles from "./EventItem.module.css";

const EventItem = (props) => {
  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const [editingClicked, setEditingClicked] = useState(false);
  const { title, date:oldDate, purpose, totalCostInCents, transactions } = props.event;

  const money = useMoney(totalCostInCents);
  const date = DateFormatter(oldDate);

  const clickedForFoundations = () => {
    setFoundationsClicked((previous) => !previous);
  };

  const editEventClicked = () => {
    setEditingClicked((previous) => !previous);
  };

  if (!editingClicked) {
    const deleteClicked = () => {
      props.deleteClicked(props.event);
    };

    return (
      <Fragment>
        <div className={styles.item} onClick={clickedForFoundations}>
          <div className={styles.titleDiv}>{title}</div>
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

export default EventItem;
