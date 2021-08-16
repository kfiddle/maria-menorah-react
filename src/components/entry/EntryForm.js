import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "./EntryForm.module.css";
import PossibleFoundationsList from "./possibleFoundations/PossibleFoundationsList";
import PurposesList from "./PurposesList";
import PayeesList from "../payees/PayeesList";

import GetAList from "../helperFunctions/GetAList";
import PushSomething from "../helperFunctions/PushSomething";
import PushNewOrEdit from "../helperFunctions/PushNewOrEdit";

import MoneySplitter from "../helperFunctions/MoneySplitter";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const EntryForm = (props) => {
  const [purposesList, setPurposesList] = useState([]);
  const [possibleFoundationsList, setPossibleFoundationsList] = useState([]);
  const [enteredPurpose, setEnteredPurpose] = useState(null);
  const [purposeClicked, setPurposeClicked] = useState(false);

  const [payeeDropdownClicked, setPayeeDropdownClicked] = useState(false);
  const [payeesList, setPayeesList] = useState([]);
  const [clickedPayeeList, setClickedPayeeList] = useState([]);

  const [submitClicked, setSubmitClicked] = useState(false);

  const [transactionList, setTransactionList] = useState([]);

  let name = "";
  let date = "";
  let purpose = "";
  let totalCostInCents = "";
  let transactions = "";
  let payees = "";
  let notes = "";

  if (props.foundationItem) {
    let cost = props.foundationItem.totalCostInCents;

    const costToDisplay = () => {
      let dollars = ~~(cost / 100);
      let cents = cost % 100;
      if (cents < 10) {
        return dollars + "." + cents + "0";
      } else {
        return dollars + "." + cents;
      }
    };

    name = props.foundationItem.name;
    date = props.foundationItem.date;
    purpose = props.foundationItem.purpose;
    totalCostInCents = costToDisplay();
    transactions = props.foundationItem.transactions;
    payees = props.foundationItem.payees;
    notes = props.foundationItem.notes;
  }

  const titleRef = useRef();
  const dateRef = useRef();
  const enteredMoneyRef = useRef();
  const notesRef = useRef();

  useEffect(() => {
    const getPurposes = async () => {
      const allPurposes = await GetAList("get-purposes");
      setPurposesList(allPurposes);
    };

    getPurposes();
  }, []);

  const clickedPurpose = async (purpose) => {
    setPurposeClicked(true);
    setEnteredPurpose(purpose);

    let response = await PushSomething(purpose, "get-matching-foundations");
    let answerList = await response.json();
    setPossibleFoundationsList(
      answerList.map((foundation) => {
        return { ...foundation, amountToDebit: 0 };
      })
    );
  };

  const acceptTransaction = (transactionObject) => {
    console.log(transactionObject);
    const newList = transactionList;
    newList.push(transactionObject);
    setTransactionList(newList);
  };

  const submitEvent = (event) => {
    event.preventDefault();
    setSubmitClicked(true);

    let penniesToSend = MoneySplitter(enteredMoneyRef.current.value);

    const sendData = async () => {
      let dataToSubmit = {};
      if (!props.foundationItem) {
        dataToSubmit = {
          name: titleRef.current.value,
          date: dateRef.current.value,
          purpose: enteredPurpose,
          totalCostInCents: penniesToSend,
          transactions: transactionList,
          payees: clickedPayeeList,
          notes: notesRef.current.value,
        };
      } else {
        dataToSubmit = {
          id: props.foundationItem.id,
          name: titleRef.current.value === null? name: titleRef.current.value,
          date: dateRef.current.value === null? date: dateRef.current.value,
          purpose: enteredPurpose === null? purpose : enteredPurpose,
          totalCostInCents: penniesToSend === null? props.foundationItem.totalCostInCents: penniesToSend,
          transactions: transactionList,
          payees: clickedPayeeList,
          notes: notesRef.current.value,
        };
      }
      let type; 
      props.foundationItem ? type = 'modify' : type = 'add';
      let response = await PushNewOrEdit(
        dataToSubmit,
        "add-or-modify-foundation-item",
        type
      );

      if (response.ok) {
        props.closeModal();
      }
    };

    setTimeout(sendData, 2500);
  };

  const getPayees = async () => {
    const allPayees = await GetAList("get-payees");
    setPayeesList(allPayees);
  };

  const openPayeeDropdown = () => {
    setPayeeDropdownClicked((previous) => !previous);
    getPayees();
  };

  const clickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList;
    tempPayeeList.push(payee);
    setClickedPayeeList(tempPayeeList);
  };

  const unclickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList.filter(
      (pyee) => pyee.id !== payee.id
    );
    setClickedPayeeList(tempPayeeList);
  };

  return (
    <div className={classes.outerContainer}>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        portalElement
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>
          <Card>
            <form className={classes.form}>
              <div className={classes.control}>
                <label htmlFor="title">Foundation Item</label>
                <input
                  type="text"
                  id="title"
                  ref={titleRef}
                  placeholder={name}
                />
              </div>

              <div className={classes.control}>
                <div className={classes.payeesDiv}>
                  <h3 onClick={openPayeeDropdown}>Payees?</h3>

                  {payeeDropdownClicked && (
                    <div className={classes.payeeListDiv}>
                      <PayeesList
                        list={payeesList}
                        clicked={clickedPayee}
                        unclick={unclickedPayee}
                        which={"possible"}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={classes.moneyAndDate}>
                <div className={`${classes.control} ${classes.moneyDiv}`}>
                  <label htmlFor="text">Cost</label>
                  <input
                    type="number"
                    id={classes.dollars}
                    ref={enteredMoneyRef}
                    placeholder={totalCostInCents}
                  />
                </div>

                <div className={`${classes.control} ${classes.moneyDiv}`}>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id={classes.dateInput}
                    ref={dateRef}
                    defaultValue={date}
                  />
                </div>
              </div>

              <div className={classes.purposesAndFoundationsDiv}>
                <div className={classes.purposeDiv}>
                  <PurposesList
                    list={purposesList}
                    clickedPurpose={clickedPurpose}
                  />
                </div>

                <div>
                  {purposeClicked && (
                    <PossibleFoundationsList
                      list={possibleFoundationsList}
                      submitClicked={submitClicked}
                      acceptTransaction={acceptTransaction}
                    />
                  )}
                </div>
              </div>

              <div className={`${classes.control} ${classes.notesDiv}`}>
                <label htmlFor="title">Notes</label>
                <input type="text" ref={notesRef} placeholder={notes} />
              </div>

              <div className={classes.buttonDiv}>
                <button className={classes.button} onClick={submitEvent}>
                  Submit Item
                </button>
              </div>
            </form>
          </Card>
        </ModalOverlay>,
        portalElement
      )}
    </div>
  );
};

export default EntryForm;
