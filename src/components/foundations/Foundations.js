import { useState, useEffect } from "react";

import FoundationItem from "./FoundationItem";

import styles from "./Foundations.module.css";

const FoundationsList = (props) => {
  return (
    <div>
      <FoundationItem />
      <FoundationItem />
      <FoundationItem />
      <FoundationItem />
      <FoundationItem />
      <FoundationItem />
    </div>
  );
};

export default FoundationsList;
