import { useState } from "react";

import classes from "./SubHeaderMonth.module.css";

const SubHeaderMonth = (props) => {
  const { name, clicked } = props.month;

  const clickHandler = () => {
    props.clicked(props.month);
  };

  return (
    <div onClick={clickHandler}>
      <li>{name}</li>
    </div>
  );
};

// className={`${styles.navBarItem} ${highlighted && chosenOne && styles.hoveredText} `}


export default SubHeaderMonth;

