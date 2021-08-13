import { useState } from "react";

import PurposeList from "../purposeList/PurposeList";
import Card from "../UI/Card";
import GetAList from "../helperFunctions/GetAList";

import styles from "./AddFoundation.module.css";

const AddFoundation = () => {
  const [purposeListClicked, setPurposeListClicked] = useState(false);
  const [purposeList, setPurposeList] = useState([]);

  const purposeListClickHandler = async () => {
    setPurposeListClicked(true);
    const allPurposes = await GetAList("get-purposes");
    setPurposeList(allPurposes);
  };

  return (
    <Card>
      <input placeholder={"Foundation Name"} type={"text"}></input>
      <input
        placeholder={"Original Contribution Amount"}
        type={"number"}
      ></input>
      <div className={styles.purposeDropdown}>
        <h2 onClick={purposeListClickHandler} className={styles.purposeText}>
          Designated Funds Purpose
        </h2>
      </div>
      {purposeListClicked && <PurposeList list={purposeList} />}

      <div className={styles.buttonDiv}>
        <button className={styles.submitButton}>Submit</button>
      </div>
    </Card>
  );
};

export default AddFoundation;
