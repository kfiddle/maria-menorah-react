import { useState } from "react";

import classes from "./PayeeItem.module.css";
import greenCheck from "../../assets/greenCheck1.jpg";
import redCheck from "../../assets/redCheck1.jpg";

const PayeeItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const { firstName, lastName, email, phoneNumber } = props.payee;

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
    console.log(props.payee);
  };

  return (
    <div onClick={clickedPossible} className={classes.payeeItemDiv}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
      <div className={classes.emailDiv}>{email}</div>
      <div className={classes.phoneDiv}>{phoneNumber}</div>
      <div className={classes.checkMarkDiv}>
        <img classname={classes.checkMark} src={greenCheck}></img>{" "}
      </div>
      <div className={classes.editButtonDiv}>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default PayeeItem;
