import { Fragment, useState } from "react";

import PushSomething from "../helperFunctions/PushSomething";
import DateFormatter from "../helperFunctions/DateFormatter";

import greenCheck from "../../assets/greenCheck1.jpg";
import redCheck from "../../assets/redCheck1.jpg";

import classes from "./PayeeItem.module.css";
import PayeeEntry from "./PayeeEntry";

const PayeeItem = (props) => {
  const { firstName, lastName, email, phoneNumber, w9ed } = props.payee;

  const [eventsClicked, setEventsClicked] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [checkedW9, setCheckedW9] = useState(w9ed);
  const [budgetItemsList, setBudgetItemsList] = useState([]);
  const [modalEditClicked, setModalEditClicked] = useState(false);

  const openEditingModal = () => {
    setModalEditClicked(true);
  };

  const closeModal = () => {
    setModalEditClicked(false);
  };

  const clickedForEvents = async () => {
    setEventsClicked((previous) => !previous);
    let listOfEvents = await PushSomething(
      props.payee,
      "get-events-from-payee"
    );
    let finalEventsList = await listOfEvents.json();
    let finalShowing = await setEventsList(finalEventsList);

    let listOfBudgetItems = await PushSomething(
      props.payee,
      "get-budget-items-from-payee"
    );
    let finalItemsList = await listOfBudgetItems.json();
    let finalBudgetItemsShowing = await setBudgetItemsList(finalItemsList);
  };

  const eventsToShow = eventsList.map((event) => (
    <div key={Math.random()}>{event.title}</div>
  ));
  const budgetItemsToShow = budgetItemsList.map((budgetItem) => (
    <div className={classes.budgetItemDiv}>
      {budgetItem.item}
      <div className={classes.community}>{budgetItem.community}</div>
      <div className={classes.itemDate}>
        {DateFormatter(budgetItem.dateOfPurchase)}
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className={classes.payeeItemDiv}>
        <div
          className={classes.nameDiv}
          onClick={clickedForEvents}
        >{`${firstName} ${lastName}`}</div>
        <div className={classes.emailDiv}>{email}</div>
        <div className={classes.phoneDiv}>{phoneNumber}</div>
        <div className={classes.checkMarkDiv}>
          {w9ed && <img className={classes.checkMark} src={greenCheck}></img>}{" "}
          {!w9ed && <h2 className={classes.redEx}>X</h2>}
        </div>
        <div className={classes.editButtonDiv}>
          <button onClick={openEditingModal}>Edit</button>
        </div>

        {modalEditClicked && (
          <PayeeEntry payee={props.payee} closeModal={closeModal} />
        )}
      </div>
      {eventsClicked && <div className={classes.eventsDiv}>{eventsToShow}</div>}
      {eventsClicked && (
        <div className={classes.eventsDiv}>{budgetItemsToShow}</div>
      )}
    </Fragment>
  );
};

export default PayeeItem;
