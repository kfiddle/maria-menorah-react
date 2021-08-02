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
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();

  const submitEvent = (event) => {
    event.preventDefault();

    const payeeToSubmit = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
    };

    const sendToBackend = async () => {
      fetch("http://localhost:8080/add-payee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payeeToSubmit),
      }).then((response) => {
        if (response.ok) {
          console.log("got it!");
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
                <input type="text" id="firstName" ref={firstNameRef} />
              </div>

              <div className={classes.control}>
                <label>Last Name</label>
                <input type="text" id="lastName" ref={lastNameRef} />
              </div>

              <div className={classes.control}>
                <label>Phone Number</label>
                <input type="text" id="phoneNumber" ref={phoneNumberRef} />
              </div>

              <div className={classes.control}>
                <label>Email</label>
                <input type="text" id="email" ref={emailRef} />
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
