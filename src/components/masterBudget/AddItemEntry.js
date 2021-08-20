import { useState, useRef } from "react";
import Card from "../UI/Card";

import PayeesList from "../payees/PayeesList";
import styles from "./addItemEntry.module.css";
import MoneySplitter from "../helperFunctions/MoneySplitter";
import PushSomething from "../helperFunctions/PushSomething";
import PushNewOrEdit from "../helperFunctions/PushNewOrEdit";
import GetAList from "../helperFunctions/GetAList";
import ReceivedCentsSplitter from "../helperFunctions/ReceivedCentsSplitter";

const AddItemEntry = (props) => {
  const [payeeDropdownClicked, setPayeeDropdownClicked] = useState(false);
  const [payeesList, setPayeesList] = useState([]);
  const [clickedPayeeList, setClickedPayeeList] = useState([]);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  const community = props.community;

  let name = "";
  let date = "";
  let cost = "";
  let accountNum = "";
  let notes = "";

  if (props.masterBudgetItem) {
    name = props.masterBudgetItem.name;
    date = props.masterBudgetItem.date;
    cost = ReceivedCentsSplitter(props.masterBudgetItem.totalCostInCents);
    accountNum = props.masterBudgetItem.accountNum;
    notes = props.masterBudgetItem.notes;
  }

  const nameRef = useRef();
  const dateRef = useRef();
  const costRef = useRef();
  const notesRef = useRef();
  const accountNumRef = useRef();

  const openPayeeDropdown = async () => {
    setPayeeDropdownClicked((previous) => !previous);
    let listOfPayees = await GetAList("get-payees");
    setPayeesList(listOfPayees);
  };

  const clickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList;
    tempPayeeList.push(payee);
    setClickedPayeeList(tempPayeeList);
    console.log(clickedPayeeList);
  };

  const unclickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList.filter(
      (pyee) => pyee.id !== payee.id
    );
    setClickedPayeeList(tempPayeeList);
  };

  const submitItem = async () => {
    let penniesToSend = MoneySplitter(costRef.current.value);
    let type = "add";

    let itemToSubmit = {
      community: community,
      name: nameRef.current.value,
      payees: clickedPayeeList,
      date: dateRef.current.value,
      totalCostInCents: penniesToSend,
      notes: notesRef.current.value,
      accountNum: accountNumRef.current.value,
    };

    if (props.masterBudgetItem) {
      type = "modify";

      itemToSubmit = {
        id: props.masterBudgetItem.id,
        community: community,
        name: nameRef.current.value,
        payees: clickedPayeeList,
        date: dateRef.current.value,
        totalCostInCents: penniesToSend,
        notes: notesRef.current.value,
        accountNum: accountNumRef.current.value,
      };
    }

    const response = await PushNewOrEdit(
      itemToSubmit,
      "add-or-modify-master-budget-item",
      type
    );

    if (response.ok) {
      props.closeModal();
    }
  };

  const deleteButtonClickHandler = async () => {
    setDeleteButtonClicked((previous) => !previous);
    if (deleteButtonClicked) {
      const response = await PushSomething(
        props.masterBudgetItem,
        "delete-item"
      );
      if (response.ok) {
        props.closeModal();
      }
    }
  };

  return (
    <Card>
      <div className={styles.outerDiv}>
        <label className={styles.text}>Item</label>
        <input ref={nameRef} placeholder={name} />

        <div className={styles.payeesDiv} onClick={openPayeeDropdown}>
          Payees?
        </div>

        {payeeDropdownClicked && (
          <div className={styles.payeeListDiv}>
            <PayeesList
              list={payeesList}
              clicked={clickedPayee}
              unclick={unclickedPayee}
              which={"possible"}
            />
          </div>
        )}

        <label className={styles.text}>Date</label>
        <input type="date" ref={dateRef} defaultValue={date} />

        <div className={styles.costAndAccountNumDiv}>
          <label className={styles.text}>Cost</label>
          <input
            type="number"
            className={styles.dollarsInput}
            ref={costRef}
            placeholder={cost}
          />

          <label className={styles.text}>Account</label>
          <input
            type="text"
            className={styles.accountNumInput}
            ref={accountNumRef}
            placeholder={accountNum}
          />
        </div>

        <label className={styles.text}>Notes</label>
        <input
          type="text"
          className={styles.notesInput}
          ref={notesRef}
          placeholder={notes}
        />

        <div className={styles.buttonsDiv}>
          <button onClick={submitItem} className={styles.submitButton}>
            Submit Item
          </button>

          {props.masterBudgetItem && (
            <button
              onClick={deleteButtonClickHandler}
              className={styles.deleteButton}
            >
              {!deleteButtonClicked ? "Delete Item" : "Are You Sure?"}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AddItemEntry;
