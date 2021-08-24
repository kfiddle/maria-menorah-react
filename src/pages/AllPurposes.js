import { Fragment } from "react";
import { useState, useEffect } from "react";

import GetAList from "../components/helperFunctions/GetAList";

import Purposes from "../components/purposes/Purposes";
// import Modal from "../components/UI/Modal/Modal";
// import AddFoundation from "../components/addFoundation/AddFoundation";

import styles from "./AllPurposes.module.css";

const AllPurposes = () => {
  const [purposesList, setPurposesList] = useState([]);
//   const [addFoundationClicked, setAddFoundationClicked] = useState(false);

  useEffect(() => {
    const getPurposes = async () => {
      const allPurposes = await GetAList("get-purposes");
      setPurposesList(allPurposes);
    };

    getPurposes();
  }, [purposesList]);



  return (
    <Fragment>
      <div className={styles.headingsDiv}>
         
          <Purposes list={purposesList}/>
       </div>
    </Fragment>
  );
};

export default AllPurposes;
