import PayeeItem from "./PayeeItem";

import styles from "./PayeesList.module.css";

const PayeesList = (props) => {
  const clicked = (payee) => {
    props.clicked(payee);
  };

  const unclicked = (payee) => {
      props.unclick(payee)
  }

  const payeesToDisplay = props.list.map((payee) => (
    <PayeeItem
      payee={payee}
      which={props.which}
      key={payee.id}
      clicked={clicked}
      unclick = {unclicked}
    />
  ));

  return <div className={styles.outerContainer}>{payeesToDisplay}</div>;
};

export default PayeesList;
