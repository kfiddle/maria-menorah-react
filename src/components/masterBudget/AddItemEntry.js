import Card from "../UI/Card";

import styles from "./addItemEntry.module.css";

const AddItemEntry = (props) => {
  return (
    <Card>
      <div className={styles.outerDiv}>
        <label className={styles.text}>Item</label>
        <input />

        <label className={styles.text}>Date</label>
        <input type="date" />

        <label className={styles.text}>Dollars</label>
        <input className={styles.dollarsInput} />

        <label className={styles.text}>Cents</label>
        <input className={styles.centsInput} />

        <div className={styles.submitButtonDiv}>
          <button>Submit Item</button>
        </div>
      </div>
    </Card>
  );
};

export default AddItemEntry;
