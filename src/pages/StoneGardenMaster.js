import MasterBudget from "../components/masterBudget/MasterBudget";
import styles from "./StoneGardenMaster.module.css";

const StoneGardenMaster = (props) => {
  let monthlyAmount = 235900;

  return (
    <MasterBudget
      community={"Stone Gardens"}
      monthlyStartingAmount={monthlyAmount}
    />
  );
};

export default StoneGardenMaster;
