import { useState, useRef } from "react";
import Card from "../UI/Card";

import PayeesList from "../payees/PayeesList";
import styles from "./addItemEntry.module.css";
import MoneySplitter from "../helperFunctions/MoneySplitter";
import PushSomething from "../helperFunctions/PushSomething";
import GetAList from "../helperFunctions/GetAList";

const AddItemEntry = (props) => {
  const [payeeDropdownClicked, setPayeeDropdownClicked] = useState(false);
  const [payeesList, setPayeesList] = useState([]);
  const [clickedPayeeList, setClickedPayeeList] = useState([]);

  const community = props.community;

  const itemRef = useRef();
  const dateRef = useRef();
  const costRef = useRef();

  const openPayeeDropdown = async () => {
    setPayeeDropdownClicked((previous) => !previous);
    let listOfPayees = await GetAList("get-payees");
    setPayeesList(listOfPayees);
  };

  const clickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList;
    tempPayeeList.push(payee);
    setClickedPayeeList(tempPayeeList);
    console.log(clickedPayeeList);
  };

  const unclickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList.filter(
      (pyee) => pyee.id !== payee.id
    );
    setClickedPayeeList(tempPayeeList);
  };

  const submitItem = async () => {
    let penniesToSend = MoneySplitter(costRef.current.value);
    console.log(penniesToSend);

    let itemToSubmit = {
      community: community,
      item: itemRef.current.value,
      payees: clickedPayeeList,
      dateOfPurchase: dateRef.current.value,
      costInPennies: penniesToSend,
    };

    const response = await PushSomething(itemToSubmit, 'add-budget-item');
    if (response.ok) {
      props.closeModal();
    }

   
  };

  return (
    <Card>
      <div className={styles.outerDiv}>
        <label className={styles.text}>Item</label>
        <input ref={itemRef} />

        <div className={styles.payeesDiv} onClick={openPayeeDropdown}>
          Payees?
        </div>

        {payeeDropdownClicked && (
          <div className={styles.payeeListDiv}>
            <PayeesList
              list={payeesList}
              clicked={clickedPayee}
              unclick={unclickedPayee}
              which={"possible"}
            />
          </div>
        )}

        <label className={styles.text}>Date</label>
        <input type="date" ref={dateRef} />

        <label className={styles.text}>Cost</label>
        <input type="number" className={styles.dollarsInput} ref={costRef} />

        <div className={styles.submitButtonDiv}>
          <button onClick={submitItem}>Submit Item</button>
        </div>
      </div>
    </Card>
  );
};

export default AddItemEntry;
