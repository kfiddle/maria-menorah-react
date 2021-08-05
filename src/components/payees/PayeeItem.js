import { useState } from "react";

import Modal from "../UI/Modal/Modal";
import Card from "../UI/Card";
import greenCheck from "../../assets/greenCheck1.jpg";
import redCheck from "../../assets/redCheck1.jpg";

import classes from "./PayeeItem.module.css";
import PayeeEntry from "./PayeeEntry";

const PayeeItem = (props) => {
  const [clicked, setClicked] = useState(false);
  const [modalEditClicked, setModalEditClicked] = useState(false);
  const { firstName, lastName, email, phoneNumber, w9ed } = props.payee;

  const fetchEvents = async () => {
    fetch("https://bref-chaise-13325.herokuapp.com/get-events-from-payee", {

    // fetch("http://localhost:8080/get-events-from-payee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.payee),
    })
      .then((response) => response.json())
      .then((answer) => console.log(answer));
  };

  const openEditingModal = () => {
    setModalEditClicked(true);
  };

  const closeModal = () => {
    setModalEditClicked(false);
  };

  const clickedForEvents = () => {
    fetchEvents();
    console.log(props.payee);
  };

  return (
    <div onClick={clickedForEvents} className={classes.payeeItemDiv}>
      <div className={classes.nameDiv}>{`${firstName} ${lastName}`}</div>
      <div className={classes.emailDiv}>{email}</div>
      <div className={classes.phoneDiv}>{phoneNumber}</div>
      <div className={classes.checkMarkDiv}>
        {w9ed && <img className={classes.checkMark} src={greenCheck}></img>}{" "}
        {!w9ed && <h2 className={classes.redEx}>X</h2>}
      </div>
      <div className={classes.editButtonDiv}>
        <button onClick={openEditingModal}>Edit</button>
      </div>

      {modalEditClicked && (
        <PayeeEntry payee={props.payee} closeModal={closeModal} />
      )}
    </div>
  );
};

export default PayeeItem;
