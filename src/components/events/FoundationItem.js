import { Fragment, useState, useEffect } from "react";
import useMoney from "../../hooks/useMoney";
import PushSomething from "../helperFunctions/PushSomething";
import DateFormatter from "../helperFunctions/DateFormatter";

import TransactionsToDisplay from "./transactionsToDisplay/TransactionsToDisplay";
import PayeesToDisplay from "./payeesToDisplay/PayeesToDisplay";

import styles from "./EventFoundationItem.module.css";
import EntryForm from "../entry/EntryForm";

const FoundationItem = (props) => {
  const {
    id,
    name,
    date: oldDate,
    purpose,
    totalCostInCents,
    receipts,
    payees,
    notes,
    completed,
  } = props.foundationItem;

  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(completed);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editingClicked, setEditingClicked] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [transactionsList, setTransactionsList] = useState([]);

  const money = useMoney(totalCostInCents);
  const date = DateFormatter(oldDate);

  useEffect(() => {
    const getTransactions = async () => {
      for (let receipt of receipts) {
        let response = await PushSomething(
          receipt,
          "get-transaction-from-receipt"
        );
        let finalTransaction = await response.json();
        setTransactionsList((previous) => [...previous, finalTransaction]);
      }
    };

    getTransactions();
  }, []);

  const clickedForFoundations = async () => {
    setFoundationsClicked((previous) => !previous);
  };

  const editFoundationItemClicked = () => {
    setEditingClicked((previous) => !previous);
  };

  if (!editingClicked) {
    const editClicked = () => {
      setEditingModalOpen(true);
    };

    const closeModal = () => {
      setEditingModalOpen(false);
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
        { ...props.foundationItem, completed: checkCompleted },
        "edit-item-completion"
      );
      if (response.ok) {
        setCurrentlyEditing(false);
      }
    };

    let printPurpose = purpose ? purpose.title: "";

    return (
      <Fragment>
        <div className={styles.item} onClick={clickedForFoundations}>
          <div className={styles.titleDiv}>{name}</div>
          <div className={styles.dateDiv}>{date}</div>
          <div className={styles.purposeDiv}>{printPurpose}</div>
          <div
            className={styles.costDiv}
          >{`${money.dollars}.${money.cents}`}</div>

          <div className={styles.notesDiv}>{notes}</div>

          <div className={styles.completedDiv}>
            <input
              type="checkbox"
              checked={checkCompleted}
              onChange={completedBoxChanged}
            />
          </div>

          {!currentlyEditing && (
            <button onClick={editClicked} className={styles.button}>
              Edit
            </button>
          )}
          {currentlyEditing && (
            <button className={styles.submitChangeButton} onClick={submitEdit}>
              Submit?
            </button>
          )}
        </div>
        {foundationsClicked && (
          <div className={styles.transAndPayeesDiv}>
            <TransactionsToDisplay transactions={transactionsList} />
            <PayeesToDisplay payees={payees} />
          </div>
        )}

        {editingModalOpen && (
          <EntryForm
            foundationItem={props.foundationItem}
            closeModal={closeModal}
          />
        )}
      </Fragment>
    );
  }
};

export default FoundationItem;
