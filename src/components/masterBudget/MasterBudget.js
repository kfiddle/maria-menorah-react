import { Fragment } from "react";
import MonthHeader from "../monthHeader/MonthHeader";

const MasterBudget = (props) => {
  let community = props.community;

  const chosenMonth = async (monthInt) => {
    let itemsFromBackend = await fetch(
      "http://localhost:8080/Stone Gardens/" + monthInt
    );
    let incomingItemsList = await itemsFromBackend.json();
    console.log(incomingItemsList);
  };

  return (
    <Fragment>
      <MonthHeader whichMonth={chosenMonth} />
      <div></div>
    </Fragment>
  );
};

export default MasterBudget;
