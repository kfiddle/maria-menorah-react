import styles from "./TransactionToShow.module.css";

import useMoney from "../../../hooks/useMoney";

const TransactionToShow = (props) => {
  const { totalPennies, foundation } = props.transaction;

  const cost = useMoney(totalPennies);

  return (
    <div className={styles.foundationsDiv}>
      <div className={styles.foundationName}>{foundation.name}</div>

      <div
        className={styles.foundationPennies}
      >{`${cost.dollars}.${cost.cents}`}</div>
    </div>
  );
};

export default TransactionToShow;
