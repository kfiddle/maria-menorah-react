import { useState } from "react";
import useMoney from "../../hooks/useMoney";

import Modal from "../UI/Modal/Modal";
import FoundationEditBox from "./FoundationEditBox";

import classes from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  const [modalEditClicked, setModalEditClicked] = useState(false);
  const { id, name, leftOverPennies, contributionInPennies, transactions } =
    props.foundation;

  const money = useMoney(contributionInPennies);
  const leftover = useMoney(leftOverPennies);

  const openEditingModal = () => {
    console.log(props.foundation);
    setModalEditClicked(true);
  };

  const closeModal = () => {
    setModalEditClicked(false);
  };

  const showItems = () => {
    props.clicked(props.foundation);
  };

  const clickedOrNot = props.highlighted
  ? `${classes.foundationItemDiv} ${classes.chosenFoundation}`
  : classes.foundationItemDiv;

  return (
    <div className={clickedOrNot} onClick={showItems}>
      <div className={classes.nameDiv}>{name}</div>
      <div
        className={classes.leftOverDiv}
      >{`${leftover.dollars}.${leftover.cents}`}</div>
      <div
        className={classes.moneyDiv}
      >{`${money.dollars}.${money.cents}`}</div>
      <div className={classes.editButtonDiv}>
        <button onClick={openEditingModal}>Edit</button>
      </div>

      {modalEditClicked && (
        <Modal closeModal={closeModal}>
          <FoundationEditBox
            foundation={props.foundation}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default FoundationItem;
