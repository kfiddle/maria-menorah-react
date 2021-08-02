import { useState } from "react";

import classes from "./SubHeaderMonth.module.css";

const SubHeaderMonth = (props) => {
  const month = props.month;
  const active = props.active;

  const clickHandler = () => {
    props.clicked(month);
  };

  return (
    <div
      className={!active ? classes.monthDiv : classes.highlightedDiv}
      onClick={clickHandler}
    >
      <li className={!active? classes.monthLi : classes.highlightedLi}>{month.name}</li>
    </div>
  );
};

// className={`${styles.navBarItem} ${highlighted && chosenOne && styles.hoveredText} `}

export default SubHeaderMonth;
