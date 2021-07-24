import useMoney from "../../hooks/useMoney";
import classes from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  const { name, leftOverPennies, contributionInPennies, transactions } = props.foundation;

  const money = useMoney(contributionInPennies);
  const leftover = useMoney(leftOverPennies);
  const testLength = transactions.length;

  return (
    <div className={classes.foundationItemDiv}>
      <div className={classes.nameDiv}>{name}</div>
      <div className={classes.leftOverDiv}>{`${leftover.dollars}.${leftover.cents}`}</div>
      <div
        className={classes.moneyDiv}
      >{`${money.dollars}.${money.cents}`}</div>
      <div>{testLength}</div>
      
    </div>
  );
};

export default FoundationItem;
