import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import usePushData from "../../hooks/usePushData";

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
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  const sendDeleteRequest = usePushData(
    props.eventToDelete,
    deleteButtonClicked,
    setSuccessfulDelete
  );

  const DeleteClicker = () => {
    setDeleteButtonClicked(true);
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
              <div className={classes.question}>
                {!successfulDelete
                  ? `Are you sure you want to delete ${title} on ${date}?`
                  : "It is DONE"}
              </div>
              <button className={classes.confirmButton} onClick={DeleteClicker}>
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
