import { Fragment, useState } from "react";

import Modal from "../UI/Modal/Modal";
import useMoney from "../../hooks/useMoney";
import PushSomething from "../helperFunctions/PushSomething";
import DateFormatter from "../helperFunctions/DateFormatter";

import classes from "./BudgetItem.module.css";
import AddItemEntry from "./AddItemEntry";

const BudgetItem = (props) => {
  const {
    id,
    name,
    payees,
    date: incomingDate,
    totalCostInCents,
    remainingAmount,
    notes,
    accountNum,
    completed,
  } = props.budgetItem;

  const [payeesClicked, setPayeesClicked] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(completed);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [modalEditClicked, setModalEditClicked] = useState(false);

  const openEditingModal = () => {
    setModalEditClicked(true);
  };

  const closeModal = () => {
    setModalEditClicked(false);
  };
  const amount = useMoney(totalCostInCents);
  const remainingObject = useMoney(remainingAmount);
  const date = DateFormatter(incomingDate);

  let payeesToShow = [];

  payeesToShow = payees.map((payee) => (
    <div key={Math.random()}>{`${payee.firstName} ${payee.lastName}`}</div>
  ));

  const deleteItem = async () => {
    let response = await PushSomething(props.budgetItem, "delete-item");
    if (response.ok) {
      console.log(response);
    }
  };

  const showPayees = () => {
    setPayeesClicked((previous) => !previous);
  };

  const completedBoxChanged = async () => {
    setCheckCompleted((previous) => !previous);
    if (checkCompleted === completed) {
      setCurrentlyEditing(true);
    } else {
      setCurrentlyEditing(false);
    }
  };

  const submitEdit = async () => {
    let response = await PushSomething(
      { ...props.budgetItem, completed: checkCompleted },
      "edit-item-completion"
    );
    if (response.ok) {
      setCurrentlyEditing(false);
    }
  };

  return (
    <Fragment>
      <div className={classes.budgetItemDiv}>
        <div className={classes.itemNameDiv} onClick={showPayees}>
          {name}
        </div>
        <div className={classes.dateDiv}>{date}</div>
        <div
          className={classes.moneyDiv}
        >{`${amount.dollars}.${amount.cents}`}</div>
        <div
          className={classes.remainingDiv}
        >{`${remainingObject.dollars}.${remainingObject.cents}`}</div>

        <div className={classes.notesDiv}>{notes}</div>
        <div className={classes.accountNumDiv}>{accountNum}</div>
        <div className={classes.completedDiv}>
          <input
            type="checkbox"
            checked={checkCompleted}
            onChange={completedBoxChanged}
          />
        </div>
        <div className={classes.editButtonDiv}>
          {!currentlyEditing && (
            <button onClick={openEditingModal}>Edit</button>
          )}
          {currentlyEditing && (
            <button className={classes.submitChangeButton} onClick={submitEdit}>
              Submit?
            </button>
          )}
        </div>
      </div>
      {modalEditClicked && (
        <Modal closeModal={closeModal}>

        <AddItemEntry masterBudgetItem={props.budgetItem}/>

           {/* <div>Just confirming, you're ok with deleting {name}?</div>
          <button onClick={deleteItem}>Confirm Delete</button>  */}

         </Modal>
      )}
      {payeesClicked && <div className={classes.payeesDiv}>{payeesToShow}</div>}
    </Fragment>
  );
};

export default BudgetItem;
