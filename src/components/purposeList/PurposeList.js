import { useState } from "react";

import PurposeToShow from "./PurposeToShow";

import styles from "./PurposeList.module.css";

const PurposeList = (props) => {
  const [clickedPurpose, setClickedPurpose] = useState(null);

  const clickedPurposeHandler = (purpose) => {
      setClickedPurpose(purpose);
  };

  const displayableList = props.list.map((purpose) => (
    <PurposeToShow
      purpose={purpose}
      clicked={clickedPurposeHandler}
      highlighted={clickedPurpose === purpose}
      key={purpose.id}
    />
  ));

  return <div className={styles.purposeListDiv}>{displayableList}</div>;
};

export default PurposeList;
