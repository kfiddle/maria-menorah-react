import { Fragment, useState } from "react";
import MonthHeader from "../monthHeader/MonthHeader";
import BudgetItem from "./BudgetItem";

const MasterBudget = (props) => {
  const [budgetItemsList, setBudgetItemsList] = useState([]);

  let community = props.community;
  let startingAmount = 250000;

  const chosenMonth = async (monthInt) => {
    let itemsFromBackend = await fetch(
      "http://localhost:8080/" + community + "/" + monthInt
    );
    let incomingItemsList = await itemsFromBackend.json();
    setBudgetItemsList(incomingItemsList);
    console.log(budgetItemsList);
  };

  const listAddingInRemaining = budgetItemsList.map(item => {
      startingAmount -= item.costInPennies;
    return {...item, remainingAmount: startingAmount}

  })

  const displayableItems = listAddingInRemaining.map(item => (
      <BudgetItem budgetItem={item} key={item.id}/>
  ))

  return (
    <Fragment>
      <MonthHeader whichMonth={chosenMonth} />
      <div>{displayableItems}</div>
    </Fragment>
  );
};

export default MasterBudget;
