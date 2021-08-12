

import MasterBudget from "../components/masterBudget/MasterBudget";
import styles from "./StoneGardenMaster.module.css";

const HelenMaster = (props) => {

  let monthlyAmount = 52500;
  return <MasterBudget community={'Helen'} monthlyStartingAmount={monthlyAmount}/>;
};

export default HelenMaster;
