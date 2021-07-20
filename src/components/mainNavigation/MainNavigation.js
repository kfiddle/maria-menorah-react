import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Maria's Database</div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.entryClicker} onClick={props.entryFormClicked}>
            Entry
          </li>
          <li>
            <NavLink to={"/add-quote"} activeClassName={classes.active}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-quote"} activeClassName={classes.active}>
              Foundations
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-quote"} activeClassName={classes.active}>
              Purposes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
