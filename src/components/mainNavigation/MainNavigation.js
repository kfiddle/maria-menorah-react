import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <h1>MARIA'S DATABASE</h1>
      </div>
      <nav className={classes.nav}>
        <ul>
          <div className={classes.newFormDiv}>
            <li className={classes.navItem} onClick={props.entryClicked}>
              + FOUNDATION ITEM
            </li>
            <li
              className={classes.navItem}
              onClick={props.payeeEntryClicked}
              style={{ marginRight: "7rem" }}
            >
              + PAYEE
            </li>
          </div>

          <li className={classes.navItem}>
            <NavLink to={"/foundation-items"} activeClassName={classes.active}>FOUNDATION ITEMS</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/foundations"} activeClassName={classes.active}> FOUNDATIONS</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/purposes"} activeClassName={classes.active}> PURPOSES</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/payees"} activeClassName={classes.active}> ROLODEX</NavLink>
          </li>

          <li className={classes.navItem}>
            <NavLink to={"/helen-master"} activeClassName={classes.active}> Helen's Master</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/stone-garden-master"} activeClassName={classes.active}>SG Master</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
