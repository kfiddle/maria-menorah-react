import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "./EntryForm.module.css";
import PossibleFoundationsList from "./possibleFoundations/PossibleFoundationsList";
import PurposesList from "./PurposesList";
import PayeesList from "../payees/PayeesList";

import GetAList from "../helperFunctions/GetAList";
import PushSomething from "../helperFunctions/PushSomething";
import PushNewOrEdit  from '../helperFunctions/PushNewOrEdit';

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

  const titleRef = useRef();
  const dateRef = useRef();
  const enteredMoneyRef = useRef();

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

    const dataToSubmit = {
      name: titleRef.current.value,
      date: dateRef.current.value,
      purpose: enteredPurpose,
      totalCostInCents: penniesToSend,
      transactions: transactionList,
      payees: clickedPayeeList,
    };

    const sendData = async () => {
      // let response = await PushSomething(dataToSubmit, "add-event");
      let response = await PushNewOrEdit(dataToSubmit, 'add-or-modify-foundation-item', 'add')


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
                <input type="text" id="title" ref={titleRef} />
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
                  />
                </div>

                <div className={`${classes.control} ${classes.moneyDiv}`}>
                  <label htmlFor="date">Date</label>
                  <input type="date" id={classes.dateInput} ref={dateRef} />
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
