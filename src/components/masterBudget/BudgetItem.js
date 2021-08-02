import useMoney from "../../hooks/useMoney";
import classes from "./BudgetItem.module.css";

const BudgetItem = (props) => {
  const { item, dateOfPurchase, costInPennies } = props.budgetItem;

  const amount = useMoney(costInPennies);

  return (
    <div className={classes.budgetItemDiv}>
      <div className={classes.itemNameDiv}>{item}</div>
      <div
        className={classes.dateDiv}
      >{dateOfPurchase}</div>
      <div
        className={classes.moneyDiv}
      >{`${amount.dollars}.${amount.cents}`}</div>
    </div>
  );
};

export default BudgetItem;
