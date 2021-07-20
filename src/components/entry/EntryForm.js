import { useRef } from "react";

import Card from "../UI/Card";
import classes from "./EntryForm.module.css";

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

          <div className={classes.actions}>
            <button className="btn">Submit Event</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EntryForm;
