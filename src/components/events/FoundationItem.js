import { Fragment, useState } from "react";
import useMoney from "../../hooks/useMoney";
import PushSomething from "../helperFunctions/PushSomething";
import DateFormatter from "../helperFunctions/DateFormatter";

import TransactionsToDisplay from "./transactionsToDisplay/TransactionsToDisplay";
import PayeesToDisplay from "./payeesToDisplay/PayeesToDisplay";

import styles from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  const {
    name,
    date: oldDate,
    purpose,
    totalCostInCents,
    transactions,
    payees,
    notes,
    completed,
  } = props.foundationItem;

  const [foundationsClicked, setFoundationsClicked] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(completed);
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const [editingClicked, setEditingClicked] = useState(false);

  const money = useMoney(totalCostInCents);
  const date = DateFormatter(oldDate);

  const clickedForFoundations = () => {
    setFoundationsClicked((previous) => !previous);
  };

  const editFoundationItemClicked = () => {
    setEditingClicked((previous) => !previous);
  };

  if (!editingClicked) {
    const deleteClicked = () => {
      props.deleteClicked(props.foundationItem);
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

    return (
      <Fragment>
        <div className={styles.item} onClick={clickedForFoundations}>
          <div className={styles.titleDiv}>{name}</div>
          <div className={styles.dateDiv}>{date}</div>
          <div className={styles.purposeDiv}>{purpose.title}</div>
          <div
            className={styles.costDiv}
          >{`${money.dollars}.${money.cents}`}</div>

          <div className={styles.completedDiv}>
            <input
              type="checkbox"
              checked={checkCompleted}
              onChange={completedBoxChanged}
            />
          </div>

          {!currentlyEditing && (
            <button onClick={deleteClicked} className={styles.button}>
              Delete
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
            <TransactionsToDisplay transactions={transactions} />
            <PayeesToDisplay payees={payees} />
          </div>
        )}
      </Fragment>
    );
  }
};

export default FoundationItem;
