import { Fragment, useState } from "react";

import PushSomething from "../helperFunctions/PushSomething";
import DateFormatter from "../helperFunctions/DateFormatter";

import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import classes from "./PayeeItem.module.css";
import PayeeEntry from "./PayeeEntry";

const PayeeItem = (props) => {
  const { firstName, lastName, email, phoneNumber, w9ed } = props.payee;

  const [itemsClicked, setItemsClicked] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [checkedW9, setCheckedW9] = useState(w9ed);
  const [budgetItemsList, setBudgetItemsList] = useState([]);
  const [modalEditClicked, setModalEditClicked] = useState(false);

  const openEditingModal = () => {
    setModalEditClicked(true);
  };

  const closeModal = () => {
    setModalEditClicked(false);
  };

  const clickedForItems = async () => {
    setItemsClicked((previous) => !previous);
    let listOfItems = await PushSomething(props.payee, "get-items-from-payee");
    let finalItemsList = await listOfItems.json();
    let finalShowing = await setItemsList(finalItemsList);
  };

  const itemsToShow = itemsList.map((item) => (
    <div key={Math.random()} style={{ display: "flex" }}>
      <div classname={classes.smallItemDiv} style={{ marginRight: "5rem" }}>
        {item.name}
      </div>
      <div style={{ marginRight: "3rem" }}>{DateFormatter(item.date)}</div>
      <div>{item.community}</div>
    </div>
  ));

  return (
    <Fragment>
      <div className={classes.payeeItemDiv}>
        <div
          className={classes.nameDiv}
          onClick={clickedForItems}
        >{`${firstName} ${lastName}`}</div>
        <div className={classes.emailDiv}>{email}</div>
        <div className={classes.phoneDiv}>{phoneNumber}</div>
        <div className={classes.checkMarkDiv}>
          {w9ed && <FaCheck style={{color: 'green'}}/>} {!w9ed && <ImCross style={{color: 'darkRed'}} />}
        </div>
        <div className={classes.editButtonDiv}>
          <button onClick={openEditingModal}>View or Edit</button>
        </div>

        {modalEditClicked && (
          <PayeeEntry payee={props.payee} closeModal={closeModal} />
        )}
      </div>
      {itemsClicked && <div className={classes.eventsDiv}>{itemsToShow}</div>}
      {/* {eventsClicked && (
        <div className={classes.eventsDiv}>{budgetItemsToShow}</div>
      )} */}
    </Fragment>
  );
};

export default PayeeItem;
