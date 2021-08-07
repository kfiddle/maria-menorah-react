import { Fragment, useState } from "react";
import useMoney from "../../hooks/useMoney";
import PushSomething from "../helperFunctions/PushSomething";
import classes from "./BudgetItem.module.css";

const BudgetItem = (props) => {
  const [payeesClicked, setPayeesClicked] = useState(false);
  const { item, payees, dateOfPurchase, costInPennies, remainingAmount } =
    props.budgetItem;

  const amount = useMoney(costInPennies);
  const remainingObject = useMoney(remainingAmount);

  console.log(payees);

  let payeesToShow = [];

  payeesToShow = payees.map((payee) => (
    <div>{`${payee.firstName} ${payee.lastName}`}</div>
  ));

  const deleteItem = async () => {
    let response = await PushSomething(props.budgetItem, "delete-budget-item");
    if (response.ok) {
      console.log(response);
    }
  };

  const showPayees = () => {
    setPayeesClicked(previous => !previous);
  };

  return (
    <Fragment>
      <div className={classes.budgetItemDiv} onClick={showPayees}>
        <div className={classes.itemNameDiv}>{item}</div>
        <div className={classes.dateDiv}>{dateOfPurchase}</div>
        <div
          className={classes.moneyDiv}
        >{`${amount.dollars}.${amount.cents}`}</div>
        <div
          className={classes.remainingDiv}
        >{`${remainingObject.dollars}.${remainingObject.cents}`}</div>
        <div className={classes.editButtonDiv}>
          <button onClick={deleteItem}>Delete</button>
        </div>
      </div>
      {payeesClicked && <div className={classes.payeesDiv}>{payeesToShow}</div>}
    </Fragment>
  );
};

export default BudgetItem;
