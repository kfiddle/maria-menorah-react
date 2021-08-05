import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";

import classes from "./PayeeEntry.module.css";

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

const PayeeEntry = (props) => {
  let id = "";
  let firstName = "";
  let lastName = "";
  let email = "";
  let phoneNumber = "";
  let w9 = false;

  if (props.payee) {
    id = props.payee.id;
    firstName = props.payee.firstName;
    lastName = props.payee.lastName;
    email = props.payee.email;
    phoneNumber = props.payee.phoneNumber;
    w9 = props.payee.w9ed;
  }

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const w9Ref = useRef();

  const submitEvent = (event) => {
    event.preventDefault();

    const payeeToSubmit = {
      id,
      firstName: firstNameRef.current.value === ''? firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value === ''? lastName: lastNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value === ''? phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value === ''? email: emailRef.current.value,
      w9ed: w9Ref.current.value === ''? w9: w9Ref.current.value === 'y'? true: false
    };

    console.log(payeeToSubmit);

    const sendToBackend = async () => {
      fetch("https://bref-chaise-13325.herokuapp.com/add-payee", {
      // fetch("http://localhost:8080/add-payee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payeeToSubmit),
      }).then((response) => {
        if (response.ok) {
          console.log("got it!");
          props.closeModal();
        }
      });
    };

    sendToBackend();
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
            <form className={classes.innerContainer}>
              <div className={classes.control}>
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  ref={firstNameRef}
                  placeholder={firstName}
                />
              </div>

              <div className={classes.control}>
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  ref={lastNameRef}
                  placeholder={lastName}
                />
              </div>

              <div className={classes.control}>
                <label>Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  ref={phoneNumberRef}
                  placeholder={phoneNumber}
                />
              </div>

              <div className={classes.control}>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  ref={emailRef}
                  placeholder={email}
                />
              </div>

              <div className={classes.w9Div}>
                <label>W9 on file? 'y' or 'no'</label>
                <input
                  type="text"
                  id="w9Check"
                  ref={w9Ref}
                  placeholder={w9 ? "yes" : "no"}
                />
              </div>

              <div className={classes.buttonDiv}>
                <button className={classes.button} onClick={submitEvent}>
                  Submit Payee
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

export default PayeeEntry;
