import { useState, useEffect } from "react";

import FoundationItem from "./FoundationItem";

import styles from "./FoundationsList.module.css";

const FoundationsList = (props) => {
  let listOfSplits = [];

  props.list.forEach((foundation) => {
    const splitFoundation = foundation.split(",");
    listOfSplits.push(splitFoundation);
  });

  const displayableList = listOfSplits.map((foundation) => (
    <FoundationItem foundation={foundation} key={foundation[3]} />
  ));

  return <div className={styles.outerContainer}>{displayableList}</div>;
};

export default FoundationsList;
