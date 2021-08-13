import styles from "./PurposeToShow.module.css";
const PurposeToShow = (props) => {
  const { title } = props.purpose;
  
  return <div>{title}</div>
};

export default PurposeToShow;
