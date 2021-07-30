
import PayeeItem from "./PayeeItem";

import styles from "./PayeesList.module.css";

const PayeesList = (props) => {
 

  const payeesToDisplay = props.list.map((payee) => (
    <PayeeItem payee={payee} key={payee.id} />
  ));

  return <div className={styles.outerContainer}>{payeesToDisplay}</div>;
};

export default PayeesList;
