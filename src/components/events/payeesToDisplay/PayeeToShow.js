import styles from "./PayeeToShow.module.css";

const PayeeToShow = (props) => {
  const { firstName, lastName } = props.payee;

  return <div className={styles.payeeNameDiv}>{`${firstName} ${lastName}`}</div>;
};

export default PayeeToShow;
