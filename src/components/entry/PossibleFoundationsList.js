import PossibleFoundation from "./PossibleFoundation";

const PossibleFoundationsList = (props) => {

    const sendUpTransactionObject = transactionObject => {
        props.acceptTransaction(transactionObject);
    }

  const foundationsToDisplay = props.list.map((foundation) => (
    <PossibleFoundation foundation={foundation} key={foundation.id} submitClicked={props.submitClicked} sendUpTransactionObject={sendUpTransactionObject}/>
  ));

  return <ul>{foundationsToDisplay}</ul>;
};
export default PossibleFoundationsList;

