import styles from "./EventItem.module.css";

const EventItem = (props) => {
  const { title, date, purpose, totalCostInCents } = props.event;

  const eventDollars = ~~(totalCostInCents / 100);
  const eventCents =
    totalCostInCents % 100 === 0 ? "00" : totalCostInCents % 100;
  return (
    <div className={styles.item}>
      <div className={styles.titleDiv}>{title}</div>
      <div className={styles.dateDiv}>{date}</div>
      <div className={styles.purposeDiv}>{purpose.title}</div>
      <div className={styles.costDiv}>{`${eventDollars}.${eventCents}`}</div>
      <button className={styles.button}>Delete</button>
    </div>
  );
};

export default EventItem;
