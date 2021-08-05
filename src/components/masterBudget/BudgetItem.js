import useMoney from "../../hooks/useMoney";
import classes from "./BudgetItem.module.css";

const BudgetItem = (props) => {
  const { item, payee, dateOfPurchase, costInPennies, remainingAmount } =
    props.budgetItem;

  const itemOrPayee = item === null ? `${payee.firstName} ${payee.lastName}` : item;
  const amount = useMoney(costInPennies);
  const remainingObject = useMoney(remainingAmount);

  const deleteItem = async() => {
      fetch("https://bref-chaise-13325.herokuapp.com/delete-budget-item", {

        // fetch("http://localhost:8080/delete-budget-item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props.budgetItem),
        })
          .then((response) => response.json())
          .then((answer) => console.log(answer));
  };

  return (
    <div className={classes.budgetItemDiv}>
      <div className={classes.itemNameDiv}>{itemOrPayee}</div>
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
  );
};

export default BudgetItem;
