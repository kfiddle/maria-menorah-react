import { useState } from "react";

import classes from "../PayeeItem.module.css";

const PossiblePayee = (props) => {
  const [clicked, setClicked] = useState(false);

  const { firstName, lastName } = props.payee;

  const outerContainerClass = clicked
    ? classes.clickedItem
    : classes.payeeItemDiv;

  const clickedPossible = () => {
    setClicked((previous) => !previous);
    !clicked ? props.clicked(props.payee) : props.unclick(props.payee);
  };
  return (
    <div onClick={clickedPossible} className={outerContainerClass}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
    </div>
  );
};

export default PossiblePayee;
