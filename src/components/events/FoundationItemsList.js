import { useState, useEffect } from "react";

import FoundationItem from "./FoundationItem";

import styles from "./FoundationItemsList.module.css";

const FoundationItemsList = (props) => {


  const deleteClicked = (foundationItem) => {
    props.deleteClicked(foundationItem);
  };

  const foundationItemsToDisplay = props.list.map((foundationItem) => (
    <FoundationItem
      foundationItem={foundationItem}
      key={foundationItem.id}
      deleteClicked={deleteClicked}
    />
  ));

  return (
    <div className={styles.outerContainer}>
      <div>{foundationItemsToDisplay}</div>
    </div>
  );
};

export default FoundationItemsList;
