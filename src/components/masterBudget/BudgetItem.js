import useMoney from "../../hooks/useMoney";
import classes from "./BudgetItem.module.css";

const BudgetItem = (props) => {
  const { item, payee, dateOfPurchase, costInPennies, remainingAmount } =
    props.budgetItem;

  const itemOrPayee = item === null ? `${payee.firstName} ${payee.lastName}` : item;
  const amount = useMoney(costInPennies);
  const remainingObject = useMoney(remainingAmount);

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
    </div>
  );
};

export default BudgetItem;
