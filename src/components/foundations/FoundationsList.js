import { useState } from "react";

import FoundationItem from "./FoundationItem";
import Items from "../items/Items";

import PushSomething from "../helperFunctions/PushSomething";

import styles from "./FoundationsList.module.css";

const FoundationsList = (props) => {
  const [clickedFoundation, setClickedFoundation] = useState(null);
  const [foundationItemsList, setFoundationItemsList] = useState([]);

  const clickedFoundationHandler = async (foundation) => {
    setClickedFoundation(foundation);
    let response = await PushSomething(
      foundation,
      "/get-foundation-items-from-foundation"
    );
    let finalFoundationItemsList = await response.json();
    setTimeout(() => setFoundationItemsList(finalFoundationItemsList), 100);
  };

  const foundationsToDisplay = props.list.map((foundation) => (
    <FoundationItem
      foundation={foundation}
      key={foundation.id}
      clicked={clickedFoundationHandler}
      highlighted={foundation === clickedFoundation}
    />
  ));

  return (
    <div className={styles.outerContainer}>
      <div>{foundationsToDisplay}</div>
      <Items list={foundationItemsList} />
    </div>
  );
};

export default FoundationsList;
