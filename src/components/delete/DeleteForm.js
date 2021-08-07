import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import PushSomething from "../helperFunctions/PushSomething";

import classes from "./DeleteForm.module.css";

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

const DeleteForm = (props) => {
  const { id, title, date } = props.eventToDelete;

  const sendDeleteRequest = async () => {
    let response = await PushSomething(props.eventToDelete, "delete-event");
    if (response) {
      props.closeModal();
    }
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
            <div className={classes.innerContainer}>
              <div
                className={classes.question}
              >{`Are you sure you want to delete ${title} on ${date}?`}</div>
              <button
                className={classes.confirmButton}
                onClick={sendDeleteRequest}
              >
                Confirm
              </button>
            </div>
          </Card>
        </ModalOverlay>,
        portalElement
      )}
    </div>
  );
};

export default DeleteForm;
