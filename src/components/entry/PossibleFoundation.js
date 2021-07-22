import { useState, useEffect, useRef } from "react";

import useMoney from "../../hooks/useMoney";

import styles from "./PossibleFoundation.module.css";

const PossibleFoundation = (props) => {
    const [amountToDebit, setAmountToDebit] = useState(0);
  const { name, leftOverPennies } = props.foundation;
  const enteredAmount = useRef();
  const realMoney = useMoney(leftOverPennies);

  useEffect(() => {
    if (props.submitClicked) {
        props.sendUpTransactionObject({foundation: props.foundation, totalPennies: +enteredAmount.current.value * 100})
    }

  }, [props.submitClicked])



//   const setAmountToDebit = event => {
//       console.log(name + ' will give ' + event.target.value)

//       setAmountToDebit(event.target.value)
//       props.sendUpAmount({foundation: props.foundation, totalPennies: enteredAmount })
//   }

  return (
    <li className={styles.listItem}>
      <div className={styles.name}>{name}</div>
      <div
        className={styles.moneyDiv}
      >{`${realMoney.dollars}.${realMoney.cents}`}</div>
      <input ref={enteredAmount}></input>
    </li>
  );
};

export default PossibleFoundation;
