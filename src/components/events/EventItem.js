import { Fragment, useState } from "react";
import useMoney from "../../hooks/useMoney";

import styles from "./EventItem.module.css";

const EventItem = (props) => {
  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const { title, date, purpose, totalCostInCents, transactions } = props.event;

  const adjustedTransactions = transactions.map((transaction) => {
    const cost = {
      dollars: ~~(transaction.totalPennies / 100),
      cents:
        transaction.totalPennies % 100 === 0
          ? "00"
          : transaction.totalPennies % 100,
    };

    return { ...transaction, cost };
  });

  const transactionsToDisplay = adjustedTransactions.map((transaction) => {
    return (
      <div key={transaction.id} className={styles.foundationsDiv}>
        <div className={styles.foundationName}>
          {transaction.foundation.name}
        </div>
        <div
          className={styles.foundationPennies}
        >{`${transaction.cost.dollars}.${transaction.cost.cents}`}</div>
      </div>
    );
  });

  const money = useMoney(totalCostInCents);

  const clickedForFoundations = () => {
    setFoundationsClicked((previous) => !previous);
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
        <button className={styles.button}>Edit</button>
      </div>
      {foundationsClicked && <div>{transactionsToDisplay}</div>}
    </Fragment>
  );
};

export default EventItem;
