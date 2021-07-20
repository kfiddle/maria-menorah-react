import { useEffect } from "react";

const PurposesList = (props) => {
 

  const listToDisplay = props.list.map((purpose) => (
    <li key={purpose.id}>{purpose.title}</li>
  ));

  return (
    
      <ul>{listToDisplay}</ul>
    
  );
};

export default PurposesList;
