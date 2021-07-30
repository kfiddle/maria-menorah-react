import { useState } from "react";

import classes from "./PayeeItem.module.css";

const PayeeItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const { firstName, lastName } = props.payee;

  const possible = props.which === "possible";

  const outerContainerClass = clicked
    ? classes.clickedItem
    : classes.payeeItemDiv;

  const clickedPossible = () => {
    if (props.which === "possible") {
      setClicked((previous) => !previous);
      !clicked ? props.clicked(props.payee) : props.unclick(props.payee);
    } else {
        console.log(props.payee)
    }
  };

  return (
    <div onClick={clickedPossible} className={outerContainerClass}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
      {!possible && <div className={classes.leftOverDiv}>nothing yet</div>}
    </div>
  );
};

export default PayeeItem;
