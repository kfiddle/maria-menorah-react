import { useState } from "react";

// import SubHeaderMonth from './SubHeaderMonth';
import classes from "./MonthHeader.module.css";

const months = [
  { name: "January", clicked: false },
  { name: "February", clicked: false },
  { name: "March", clicked: false },
  { name: "April", clicked: false },
  { name: "May", clicked: false },
  { name: "June", clicked: false },
  { name: "July", clicked: false },
  { name: "August", clicked: false },
  { name: "September", clicked: false },
  { name: "October", clicked: false },
  { name: "November", clicked: false },
  { name: "December", clicked: false },
];

const MonthHeader = (props) => {
  const [clickedList, setClickedList] = useState(months);

  // const displayableList = months.map(month => (
  //   <SubHeaderMonth />
  // ))

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul></ul>
      </nav>
    </header>
  );
};

export default MonthHeader;
