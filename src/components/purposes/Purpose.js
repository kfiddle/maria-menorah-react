import styles from "./Purpose.module.css";


const Purpose = (props) => {
  const { title } = props.purpose;

  return <div className={styles.outerContainer}>{title}</div>;
};

export default Purpose;
