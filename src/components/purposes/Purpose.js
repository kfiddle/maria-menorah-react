import { Fragment, useState } from "react";
import PushSomething from "../helperFunctions/PushSomething";
import styles from "./Purpose.module.css";

const Purpose = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const { title } = props.purpose;

  const showFoundationItems = async () => {
    let response = await PushSomething(
      props.purpose,
      "/get-foundation-items-from-purpose"
    );
    let finalItemsList = await response.json();
    setItemsList(finalItemsList);

    // let finalShowing = await setItemsList(finalItemsList);
    // let displayIt = await console.log(itemsList);
  };

  return (
    <Fragment>
      <div onClick={showFoundationItems} className={styles.outerContainer}>
        {title}
      </div>
      {}
    </Fragment>
  );
};

export default Purpose;
