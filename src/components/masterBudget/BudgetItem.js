import useMoney from "../../hooks/useMoney";
import classes from "./BudgetItem.module.css";

const BudgetItem = (props) => {
  const { item, dateOfPurchase, costInPennies, remainingAmount } =
    props.budgetItem;

  const amount = useMoney(costInPennies);
  const remainingObject = useMoney(remainingAmount);

  return (
    <div className={classes.budgetItemDiv}>
      <div className={classes.itemNameDiv}>{item}</div>
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
