import { useState } from "react";

import styles from "./PurposeToShow.module.css";
const PurposeToShow = (props) => {
  const [purposeClicked, setPurposeClicked] = useState(false);

  const { title } = props.purpose;

  const clickedOrNot = props.highlighted
    ? `${styles.purposeDiv} ${styles.clickedPurposeDiv}`
    : styles.purposeDiv;

  const clickedPurpose = () => {
    setPurposeClicked((previous) => !previous);
    props.clicked(props.purpose);
  };

  return (
    <div onClick={clickedPurpose} className={clickedOrNot}>
      <h3>{title}</h3>
    </div>
  );
};

export default PurposeToShow;
