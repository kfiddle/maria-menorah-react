import { useEffect } from "react";
import PurposeListItem from "./PurposeListItem";

const PurposesList = (props) => {

  const clickedPurpose = (purpose) => { 
    props.clickedPurpose(purpose);
  };

  const listToDisplay = props.list.map((purpose) => (
    <PurposeListItem
      key={purpose.id}
      purpose={purpose}
      clickedPurpose={clickedPurpose}
    ></PurposeListItem>
  ));

  return <ul>{listToDisplay}</ul>;
};

export default PurposesList;
