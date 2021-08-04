import { Fragment, useState } from "react";
import MonthHeader from "../monthHeader/MonthHeader";
import BudgetItem from "./BudgetItem";

import Modal from '../UI/Modal/Modal';
import AddItemEntry from "./AddItemEntry";

import styles from "./MasterBudget.module.css";

const MasterBudget = (props) => {
  const [budgetItemsList, setBudgetItemsList] = useState([]);
  const [addItemClicked, setAddItemClicked] = useState(false);

  let community = props.community;
  let startingAmount = 250000;

  const chosenMonth = async (monthInt) => {
    let itemsFromBackend = await fetch(
      //   "https://bref-chaise-13325.herokuapp.com/" + community + "/" + monthInt

      "http://localhost:8080/" + community + "/" + monthInt
    );
    let incomingItemsList = await itemsFromBackend.json();
    setBudgetItemsList(incomingItemsList);
    console.log(budgetItemsList);
  };

  const listAddingInRemaining = budgetItemsList.map((item) => {
    startingAmount -= item.costInPennies;
    return { ...item, remainingAmount: startingAmount };
  });

  const displayableItems = listAddingInRemaining.map((item) => (
    <BudgetItem budgetItem={item} key={item.id} />
  ));

  const closeModal = () => {
    setAddItemClicked(false);
  };

  const openAddItemModal = () => {
    setAddItemClicked(true);
  };

  return (
    <Fragment>
      <MonthHeader whichMonth={chosenMonth} />
      <div>{displayableItems}</div>
      <div className={styles.addItemButtonDiv}>
        <button onClick={openAddItemModal}>Add Item</button>
      </div>
      {addItemClicked && <Modal closeModal={closeModal}><AddItemEntry /></Modal>}
    </Fragment>
  );
};

export default MasterBudget;
