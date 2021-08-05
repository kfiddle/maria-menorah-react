import { useState, useRef } from "react";
import Card from "../UI/Card";

import PayeesList from "../payees/PayeesList";
import styles from "./addItemEntry.module.css";

const AddItemEntry = (props) => {
  const [payeeDropdownClicked, setPayeeDropdownClicked] = useState(false);
  const [payeesList, setPayeesList] = useState([]);
  const [clickedPayeeList, setClickedPayeeList] = useState([]);

  const community = props.community;

  const itemRef = useRef();
  const dateRef = useRef();
  const dollarsRef = useRef();
  const centsRef = useRef();

  const getPayees = async () => {
    let payeesFromBackend = await fetch(
      // "https://bref-chaise-13325.herokuapp.com/get-payees"
      "http://localhost:8080/get-payees"
    );

    let incomingPayeesList = await payeesFromBackend.json();
    setPayeesList(incomingPayeesList);
  };

  const openPayeeDropdown = () => {
    setPayeeDropdownClicked((previous) => !previous);
    getPayees();
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

  const submitItem = () => {
    let itemToSubmit = {
      community: community,
      item: itemRef.current.value,
      dateOfPurchase: dateRef.current.value,
      costInPennies: dollarsRef.current.value * 100 + +centsRef.current.value,
    };

    const postingFunction = setTimeout(() => {
      // fetch("https://bref-chaise-13325.herokuapp.com/add-event", {
      fetch("http://localhost:8080/add-budget-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSubmit),
      }).then((response) => {
        if (response.ok) {
         console.log('got it toots')
          // setPurposeClicked(false);
          props.closeModal();
        }
      });
    }, 200);
  }

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

        <label className={styles.text}>Dollars</label>
        <input type="number" className={styles.dollarsInput} ref={dollarsRef} />

        <label className={styles.text}>Cents</label>
        <input type="number" className={styles.centsInput} ref={centsRef} />

        <div className={styles.submitButtonDiv}>
          <button onClick={submitItem}>Submit Item</button>
        </div>
      </div>
    </Card>
  );
};

export default AddItemEntry;
