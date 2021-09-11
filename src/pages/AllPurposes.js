import { Fragment } from "react";
import { useState, useEffect } from "react";

import GetAList from "../components/helperFunctions/GetAList";

import Purposes from "../components/purposes/Purposes";

import styles from "./AllPurposes.module.css";

const AllPurposes = () => {
  const [purposesList, setPurposesList] = useState([]);

  useEffect(() => {
    const getPurposes = async () => {
      const allPurposes = await GetAList("get-purposes");
      setPurposesList(allPurposes);
    };

    getPurposes();
  }, []);

  return (
    <Fragment>
      <div className={styles.headingsDiv}>
        <Purposes list={purposesList} />
      </div>
    </Fragment>
  );
};

export default AllPurposes;
