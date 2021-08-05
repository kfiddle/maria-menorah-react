import { Fragment } from "react";
import { useState, useEffect } from "react";

import FoundationsList from "../components/foundations/FoundationsList";

import styles from './AllFoundations.module.css';

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);

  useEffect(() => {
    const getListOfFoundations = async () => {
      let foundationsFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-foundations"
        // "http://localhost:8080/get-foundations"
      );

      let incomingFoundationsList = await foundationsFromBackend.json();
      setFoundationsList(incomingFoundationsList);
    };

    getListOfFoundations();
  }, []);

  return (
    <Fragment>
      <div className={styles.headingsDiv}><h2 className={styles.leftOverHeader}>Left Over</h2><h2>Original Contribution</h2></div>
      <FoundationsList list={foundationsList} />
    </Fragment>
  );
};

export default AllFoundations;
