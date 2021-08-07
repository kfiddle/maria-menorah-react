import { Fragment } from "react";
import { useState, useEffect } from "react";

import GetAList from "../components/helperFunctions/GetAList";

import FoundationsList from "../components/foundations/FoundationsList";

import styles from "./AllFoundations.module.css";

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);

  useEffect(() => {

    const getFoundations = async () => {
      const allFoundations = await GetAList("get-foundations");
      setFoundationsList(allFoundations);
    };

    getFoundations();
  }, []);

  return (
    <Fragment>
      <div className={styles.headingsDiv}>
        <h2 className={styles.leftOverHeader}>Left Over</h2>
        <h2>Original Contribution</h2>
      </div>
      <FoundationsList list={foundationsList} />
    </Fragment>
  );
};

export default AllFoundations;
