import { Fragment, useState } from "react";
import MonthHeader from "../monthHeader/MonthHeader";
import BudgetItem from "./BudgetItem";

import Modal from "../UI/Modal/Modal";
import AddItemEntry from "./AddItemEntry";
import GetAList from "../helperFunctions/GetAList";

import styles from "./MasterBudget.module.css";

const MasterBudget = (props) => {
  const [budgetItemsList, setBudgetItemsList] = useState([]);
  const [addItemClicked, setAddItemClicked] = useState(false);

  let community = props.community;
  let startingAmount = 250000;

  const chosenMonth = async (monthInt) => {
    const allItemsOfMonth = await GetAList(community + "/" + monthInt);
    setBudgetItemsList(allItemsOfMonth);
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
      {addItemClicked && (
        <Modal closeModal={closeModal}>
          <AddItemEntry community={community} closeModal={closeModal} />
        </Modal>
      )}
    </Fragment>
  );
};

export default MasterBudget;
