import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "./EntryForm.module.css";
import PossibleFoundationsList from "./PossibleFoundationsList";
import PurposesList from "./PurposesList";

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

  const [submitClicked, setSubmitClicked] = useState(false);

  const [transactionList, setTransactionList] = useState([]);

  const titleRef = useRef();
  const dateRef = useRef();
  const companyRef = useRef();
  const enteredDollars = useRef();
  const enteredCents = useRef();

  useEffect(() => {
    const getListOfPurposes = async () => {
      let purposesFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-purposes"
      );
      let incomingPurposesList = await purposesFromBackend.json();
      setPurposesList(incomingPurposesList);
    };

    getListOfPurposes();
  }, [purposesList]);

  const clickedPurpose = (purpose) => {
    setPurposeClicked(true);
    setEnteredPurpose(purpose);

    fetch("https://bref-chaise-13325.herokuapp.com/get-matching-foundations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purpose),
    })
      .then((data) => data.json())
      .then((answerList) =>
        setPossibleFoundationsList(
          answerList.map((foundation) => {
            return { ...foundation, amountToDebit: 0 };
          })
        )
      );
  };

  const acceptTransaction = (transactionObject) => {
    console.log(transactionObject);
    const newList = transactionList;
    newList.push(transactionObject);
    setTransactionList(newList);
  };

  function submitEvent(event) {
    event.preventDefault();
    setSubmitClicked(true);

    const dataToSubmit = {
      title: titleRef.current.value,
      date: dateRef.current.value,
      totalCostInCents:
        +(enteredDollars.current.value * 100) + +enteredCents.current.value,

      purpose: enteredPurpose,
      transactions: transactionList,
    };

    const postingFunction = setTimeout(() => {
      // fetch("https://bref-chaise-13325.herokuapp.com/add-event", {
        fetch("http://localhost:8080/add-event", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      }).then((response) => {
        if (response.ok) {
          console.log("got it!");
          titleRef.current.value = "";
          enteredDollars.current.value = "";
          enteredCents.current.value = "";
          dateRef.current.value = "";
          setPurposeClicked(false);
        }
      });
    }, 200);

  }

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
                <label htmlFor="title">Event</label>
                <input type="text" id="title" ref={titleRef} />
              </div>

              <div className={classes.control}>
                <label htmlFor="company">Payees</label>
                <input type="text" ref={companyRef} />
              </div>
              <div className={`${classes.control} ${classes.moneyDiv}`}>
                <label htmlFor="text">Dollars</label>
                <input
                  type="number"
                  id={classes.dollars}
                  ref={enteredDollars}
                />
                <label htmlFor="text">Cents</label>
                <input type="number" ref={enteredCents} />
              </div>

              <div className={classes.control}>
                <input type="date" id={classes.dateInput} ref={dateRef} />
              </div>

              <div className={classes.purposesAndFoundationsDiv}>
                <div className={classes.purposeDiv}>
                  <PurposesList
                    list={purposesList}
                    clickedPurpose={clickedPurpose}
                  />
                </div>

                <div>
                  {purposeClicked && <PossibleFoundationsList
                    list={possibleFoundationsList}
                    submitClicked={submitClicked}
                    acceptTransaction={acceptTransaction}
                  />}
                </div>
              </div>

              <div className={classes.buttonDiv}>
                <button className={classes.button} onClick={submitEvent}>
                  Submit Event
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
