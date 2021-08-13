import PurposeToShow from "./PurposeToShow";

import styles from "./PurposeList.module.css";

const PurposeList = (props) => {
 
  const displayableList = props.list.map((purpose) => (
    <PurposeToShow purpose={purpose} key={purpose.id} />
  ));

  return <div>{displayableList}</div>;
};

export default PurposeList;
