import PayeeToShow from "./PayeeToShow";
import styles from "./PayeesToDisplay.module.css";

const PayeesToDisplay = (props) => {
  const displayablePayees = props.payees.map((payee) => (
    <PayeeToShow payee={payee} key={payee.id} />
  ));

  return <div className={styles.container}>{displayablePayees}</div>;
};

export default PayeesToDisplay;
