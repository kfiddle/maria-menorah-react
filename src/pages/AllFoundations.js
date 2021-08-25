import { Fragment } from "react";
import { useState, useEffect } from "react";

import GetAList from "../components/helperFunctions/GetAList";

import FoundationsList from "../components/foundations/FoundationsList";
import Modal from "../components/UI/Modal/Modal";
import AddFoundation from "../components/addFoundation/AddFoundation";

import styles from "./AllFoundations.module.css";

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);
  const [addFoundationClicked, setAddFoundationClicked] = useState(false);

  useEffect(() => {
    const getFoundations = async () => {
      const allFoundations = await GetAList("get-foundations");
      setFoundationsList(allFoundations);
    };

    getFoundations();
  }, []);

  const addFoundation = () => {
    setAddFoundationClicked(true);
  };

  const closeModal = () => {
    setAddFoundationClicked(false);
  };

  return (
    <Fragment>
      <div className={styles.headingsDiv}>
        <h2 className={styles.leftOverHeader}>Left Over</h2>
        <h2>Original Amount</h2>
      </div>
      <FoundationsList list={foundationsList} />
      <div className={styles.addFoundationDiv}>
        <button onClick={addFoundation} className={styles.addButton}>
          Add Foundation
        </button>
      </div>
      {addFoundationClicked && (
        <Modal closeModal={closeModal}>
          <AddFoundation />
        </Modal>
      )}
    </Fragment>
  );
};

export default AllFoundations;
