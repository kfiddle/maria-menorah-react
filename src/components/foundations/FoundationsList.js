import { useState, useEffect } from "react";

import FoundationItem from "./FoundationItem";

import styles from "./FoundationsList.module.css";

const FoundationsList = (props) => {
  const foundationsToDisplay = props.list.map((foundation) => (
    <FoundationItem foundation={foundation} key={foundation.id} />
  ));

  return <div className={styles.outerContainer}>{foundationsToDisplay}</div>;
};

export default FoundationsList;
