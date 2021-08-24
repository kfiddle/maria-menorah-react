import { Fragment } from "react";
import { useState } from "react";

import PushSomething from "../helperFunctions/PushSomething";
import Purpose from "./Purpose";
import Items from "../items/Items";

import styles from "./Purposes.module.css";

const Purposes = (props) => {
  const [clickedPurpose, setClickedPurpose] = useState(null);
  const [foundationItemsList, setFoundationItemsList] = useState([]);

  const getFoundationItems = async (purpose) => {
    let response = await PushSomething(
      purpose,
      "/get-foundation-items-from-purpose"
    );
    let finalFoundationItemsList = await response.json();
    setTimeout(() => setFoundationItemsList(finalFoundationItemsList), 100);
  };

  const clickedPurposeHandler = (purpose) => {
    setClickedPurpose(purpose);
    getFoundationItems(purpose);
  };

  let displayablePurposes = props.list.map((purpose) => (
    <Purpose
      key={purpose.id}
      purpose={purpose}
      clicked={clickedPurposeHandler}
      highlighted={purpose === clickedPurpose}
    />
  ));

  return (
    <div className={styles.outerContainer}>
      <div>{displayablePurposes}</div>
      <Items list={foundationItemsList} />
    </div>
  );
};

export default Purposes;
