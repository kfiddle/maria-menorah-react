import classes from "./FoundationItem.module.css";

const FoundationItem = (props) => {
  return (
    <div className={classes.foundationItemDiv}>{props.foundation.name}</div>
  );
};

export default FoundationItem;
