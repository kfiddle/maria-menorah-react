import { useState } from "react";
import Card from "../UI/Card";

import PayeesList from "../payees/PayeesList";
import styles from "./addItemEntry.module.css";

const AddItemEntry = (props) => {
  const [payeeDropdownClicked, setPayeeDropdownClicked] = useState(false);
  const [payeesList, setPayeesList] = useState([]);
  const [clickedPayeeList, setClickedPayeeList] = useState([]);


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
  };

  const unclickedPayee = (payee) => {
    const tempPayeeList = clickedPayeeList.filter(
      (pyee) => pyee.id !== payee.id
    );
    setClickedPayeeList(tempPayeeList);
  };
 

  return (
    <Card>
      <div className={styles.outerDiv}>
        <label className={styles.text}>Item</label>
        <input />

        <div className={styles.payeesDiv} onClick={openPayeeDropdown}>
          Payees?
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
        </div>

        <label className={styles.text}>Date</label>
        <input type="date" />

        <label className={styles.text}>Dollars</label>
        <input className={styles.dollarsInput} />

        <label className={styles.text}>Cents</label>
        <input className={styles.centsInput} />

        <div className={styles.submitButtonDiv}>
          <button>Submit Item</button>
        </div>
      </div>
    </Card>
  );
};

export default AddItemEntry;
