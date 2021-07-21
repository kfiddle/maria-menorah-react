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

  const authorInputRef = useRef();
  const textInputRef = useRef();

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
    fetch("https://bref-chaise-13325.herokuapp.com/get-matching-foundations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purpose),
    })
      .then((data) => data.json())
      .then((answerList) => setPossibleFoundationsList(answerList));
  };

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
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
            <form className={classes.form} onSubmit={submitFormHandler}>
              <div className={classes.control}>
                <label htmlFor="title">Event</label>
                <input type="text" id="author" ref={authorInputRef} />
              </div>

              <div className={classes.control}>
                <label htmlFor="company">Company</label>
                <input type="text" id="author" ref={authorInputRef} />
              </div>
              <div className={`${classes.control} ${classes.moneyDiv}`}>
                <label htmlFor="text">Dollars</label>
                <input type="number" id={classes.dollars} />
                <label htmlFor="text">Cents</label>
                <input type="number" />
              </div>

              <div className={classes.control}>
                <input type="date" id={classes.dateInput} />
              </div>

              <div className={classes.purposesAndFoundationsDiv}>
                <div className={classes.purposeDiv}>
                  <PurposesList
                    list={purposesList}
                    clickedPurpose={clickedPurpose}
                  />
                </div>

                <div>
                  <PossibleFoundationsList list={possibleFoundationsList}/>

                  {/* <ul>
                    <li>soon to be a foundation and inputs</li>
                    <li>soon to be a foundation and inputs</li>
                    <li>soon to be a foundation and inputs</li>
                  </ul> */}
                </div>
              </div>

              <div className={classes.buttonDiv}>
                <button className={classes.button}>Submit Event</button>
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
