import { useState } from "react";

import classes from "./PayeeItem.module.css";

const PayeeItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const { firstName, lastName } = props.payee;

  const fetchEvents = async () => {
    // fetch("https://bref-chaise-13325.herokuapp.com/get-events-from-payee", {

    fetch("http://localhost:8080/get-events-from-payee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.payee),
    })
      .then((response) => response.json())
      .then((answer) => console.log(answer));
  };

  const clickedPossible = () => {
    fetchEvents();
  };

  return (
    <div onClick={clickedPossible} className={classes.payeeItemDiv}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
      <div className={classes.leftOverDiv}>nothing yet</div>
    </div>
  );
};

export default PayeeItem;
