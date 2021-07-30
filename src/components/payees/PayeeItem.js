import { useEffect } from "react";

import useMoney from "../../hooks/useMoney";
import classes from "./PayeeItem.module.css";

const PayeeItem = (props) => {
  const { firstName, lastName } = props.payee;

  //   const money = useMoney(contributionInPennies);
  //   const leftover = useMoney(leftOverPennies);

  return (
    <div className={classes.payeeItemDiv}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
      <div className={classes.leftOverDiv}>nothing yet</div>
      {/* <div
        className={classes.moneyDiv}
      >{`${money.dollars}.${money.cents}`}</div> */}
    </div>
  );
};

export default PayeeItem;
