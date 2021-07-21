import classes from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  const { name, leftOverPennies, contributionInPennies } = props.foundation;

  const dollars = ~~(leftOverPennies / 100);
  const cents = leftOverPennies % 100 === 0 ? '00' : leftOverPennies % 100;

  return (
    <div className={classes.foundationItemDiv}>
      <div className={classes.nameDiv}>{name}</div>
      <div className={classes.moneyDiv}>{`${dollars}.${cents}`}</div>
    </div>
  );
};

export default FoundationItem;
