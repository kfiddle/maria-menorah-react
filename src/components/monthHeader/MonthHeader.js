import { NavLink } from "react-router-dom";

import classes from "./MonthHeader.module.css";

const MonthHeader = (props) => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/january"} activeClassName={classes.active}>
                January
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/february"} activeClassName={classes.active}>
                February
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/march"} activeClassName={classes.active}>
                March
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/april"} activeClassName={classes.active}>
                April
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/may"} activeClassName={classes.active}>
                May
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/june"} activeClassName={classes.active}>
                June
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/july"} activeClassName={classes.active}>
                July
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/august"} activeClassName={classes.active}>
                August
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/september"} activeClassName={classes.active}>
                September
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/october"} activeClassName={classes.active}>
                October
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/november"} activeClassName={classes.active}>
                November
              </NavLink>
            </li>
          </div>

          <div className={classes.monthDiv}>
            <li>
              <NavLink to={"/december"} activeClassName={classes.active}>
                December
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default MonthHeader;
