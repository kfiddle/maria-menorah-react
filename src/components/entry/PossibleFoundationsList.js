const PossibleFoundationsList = props => {
  const foundationsToDiplay = props.list.map((foundation) => (
    <li key={foundation.id}>{foundation.name}</li>
  ));

  return <ul>{foundationsToDiplay}</ul>;
};

export default PossibleFoundationsList;
