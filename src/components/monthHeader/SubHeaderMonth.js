import { useState } from "react";

import classes from "./SubHeaderMonth.module.css";

const SubHeaderMonth = (props) => {
  const month = props.month;

  const clickHandler = () => {
    props.clicked(month);
  };

  return (
    <div className={classes.monthDiv} onClick={clickHandler}>
      <li className={`${classes.monthLi}`}>{`${month}  ${props.active}`}</li>
    </div>
  );
};

// className={`${styles.navBarItem} ${highlighted && chosenOne && styles.hoveredText} `}

export default SubHeaderMonth;
