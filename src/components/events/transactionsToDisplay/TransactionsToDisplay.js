import TransactionToShow from "./TransactionToShow";
import styles from "./TransactionsToDisplay.module.css";

const TransactionsToDisplay = (props) => {
  const displayableTransactions = props.transactions.map((transaction) => (
    <TransactionToShow transaction={transaction} key={transaction.id} />
  ));

  return <div>{displayableTransactions}</div>;
};

export default TransactionsToDisplay;
