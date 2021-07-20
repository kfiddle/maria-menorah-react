import styles from "./EventItem.module.css";

const EventItem = (props) => {

    const { title, date, } = props.event;
  return (
    <div className={styles.item}>
      <div className={styles.titleDiv}>{title}</div>
      <div className={styles.dateDiv}>{date}</div>
      <div className={styles.purposeDiv}>Purpose</div>
      <div className={styles.costDiv}>Cost</div>
      <button className={styles.button}>Delete</button>
    </div>
  );
};

export default EventItem;
