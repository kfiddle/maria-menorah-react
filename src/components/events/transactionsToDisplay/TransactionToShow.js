import { useState, useEffect } from "react";

import styles from "./TransactionToShow.module.css";

import useMoney from "../../../hooks/useMoney";

const TransactionToShow = (props) => {
  const [foundationName, setFoundationName] = useState("");
  const { id, totalPennies, foundation } = props.transaction;

  const cost = useMoney(totalPennies);

  useEffect(() => {
    console.log(id);
    const getFoundationFromId = async () => {
      fetch("http://localhost:8080/get-transaction-from-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      })
      .then((data) => data.json())
      .then((answer) => console.log(answer))
      // .then((finalAnswer) => setFoundationName(finalAnswer.name))
      // .catch((error) => console.log(error));
    };

    getFoundationFromId();
  }, []);

  return (
    <div className={styles.foundationsDiv}>
      <div className={styles.foundationName}>helll and back</div>

      <div
        className={styles.foundationPennies}
      >{`${cost.dollars}.${cost.cents}`}</div>
    </div>
  );
};

export default TransactionToShow;
