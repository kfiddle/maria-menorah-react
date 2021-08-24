import { Fragment, useState, useEffect } from "react";
import PushSomething from "../helperFunctions/PushSomething";
import styles from "./Purpose.module.css";

const Purpose = (props) => {
  const [chosenPurpose, setChosenPurpose] = useState(false);
  const { title } = props.purpose;

  const clickedOrNot = props.highlighted
    ? `${styles.outerContainer} ${styles.chosenPurpose}`
    : styles.outerContainer;

  const clickedText = props.highlighted ? styles.highlightedText : styles.text;

  const showFoundationItems = () => {
    setChosenPurpose((previous) => !previous);
    props.clicked(props.purpose);
  };

  return (
    <div onClick={showFoundationItems} className={clickedOrNot}>
      <h1 className={clickedText}>{title}</h1>
    </div>
  );
};

export default Purpose;
