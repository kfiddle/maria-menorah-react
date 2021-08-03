import PayeeItem from "./PayeeItem";

import styles from "./PayeesList.module.css";
import PossiblePayee from "./possiblePayee/PossiblePayee";

const PayeesList = (props) => {
  const possible = props.which === "possible";

  const clicked = (payee) => {
    props.clicked(payee);
  };

  const unclicked = (payee) => {
    props.unclick(payee);
  };


  const payeesToDisplay = !possible
    ? props.list.map((payee) => (
        <PayeeItem
          payee={payee}
          which={props.which}
          key={payee.id}
          clicked={clicked}
          unclick={unclicked}
        
        />
      ))
    : props.list.map((payee) => (
        <PossiblePayee
          payee={payee}
          key={payee.id}
          clicked={clicked}
          unclick={unclicked}
        />
      ));

  return <div className={styles.outerContainer}>{payeesToDisplay}</div>;
};

export default PayeesList;
