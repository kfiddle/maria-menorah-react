import { useState, useEffect } from "react";

import SubHeaderMonth from "./SubHeaderMonth";
import classes from "./MonthHeader.module.css";

const months = [
 
  { id: 7, name: "July", clicked: false },
  { id: 8, name: "August", clicked: false },
  { id: 9, name: "September", clicked: false },
  { id: 10, name: "October", clicked: false },
  { id: 11, name: "November", clicked: false },
  { id: 12, name: "December", clicked: false },
  { id: 1, name: "January", clicked: false },
  { id: 2, name: "February", clicked: false },
  { id: 3, name: "March", clicked: false },
  { id: 4, name: "April", clicked: false },
  { id: 5, name: "May", clicked: false },
  { id: 6, name: "June", clicked: false },
];

const MonthHeader = (props) => {
  const [clickedList, setClickedList] = useState(months);
  const [currentChoice, setCurrentChoice] = useState("");

  const clicked = (month) => {
    setCurrentChoice(month.name);
    props.whichMonth(month.id);
  };

  const displayableMonths = clickedList.map((month) => (
    <SubHeaderMonth
      month={month}
      testClicked={month.clicked}
      clicked={clicked}
      active={currentChoice === month.name}
      key={month.id}
    />
  ));

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>{displayableMonths}</ul>
        {/* <ul>{clickedList}</ul> */}
      </nav>
    </header>
  );
};

export default MonthHeader;
