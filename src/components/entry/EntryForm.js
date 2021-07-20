import { useRef } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import classes from "./EntryForm.module.css";

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
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

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

              <div className={classes.purposeDiv}>
                <ul>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                  <li>a purpose</li>
                </ul>
              </div>

              <div className={classes.actions}>
                <button className="btn">Submit Event</button>
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
