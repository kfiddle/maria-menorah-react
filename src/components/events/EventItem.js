import { Fragment, useState } from "react";

import styles from "./EventItem.module.css";

const EventItem = (props) => {
  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const { title, date, purpose, totalCostInCents, transactions } = props.event;

  const transactionsToDisplay = transactions.map((transaction) => {
    const transactionDollars = ~~(transaction.totalPennies / 100);
    const transactionCents =
      transaction.totalPennies % 100 === 0
        ? "00"
        : transaction.totalPennies % 100;

    return (
      <div className={styles.foundationsDiv}>
        <div className={styles.foundationName}>
          {transaction.foundation.name}
        </div>
        <div
          className={styles.foundationPennies}
        >{`${transactionDollars}.${transactionCents}`}</div>
      </div>
    );
  });

  const eventDollars = ~~(totalCostInCents / 100);
  const eventCents =
    totalCostInCents % 100 === 0 ? "00" : totalCostInCents % 100;

  const clickedForFoundations = () => {
    setFoundationsClicked((previous) => !previous);
  };
  return (
    <Fragment>
      <div className={styles.item} onClick={clickedForFoundations}>
        <div className={styles.titleDiv}>{title}</div>
        <div className={styles.dateDiv}>{date}</div>
        <div className={styles.purposeDiv}>{purpose.title}</div>
        <div className={styles.costDiv}>{`${eventDollars}.${eventCents}`}</div>
        <button className={styles.button}>Edit</button>
      </div>
      {foundationsClicked && <div>{transactionsToDisplay}</div>}
    </Fragment>
  );
};

export default EventItem;
