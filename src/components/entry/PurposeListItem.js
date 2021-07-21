const PurposeListItem = (props) => {
  const { id, title } = props.purpose;

  const clickedPurpose = () => {
    props.clickedPurpose(props.purpose);
  };

  return <li onClick={clickedPurpose}>{title}</li>;
};

export default PurposeListItem;
