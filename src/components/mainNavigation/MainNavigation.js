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
              ADD FOUNDATION ITEM
            </li>
            <li
              className={classes.navItem}
              onClick={props.payeeEntryClicked}
              style={{ marginRight: "7rem" }}
            >
              ADD PAYEE
            </li>
          </div>

          <li className={classes.navItem}>
            <NavLink to={"/foundation-items"}>FOUNDATION ITEMS</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/foundations"}>FOUNDATIONS</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/purposes"}>PURPOSES</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/payees"}>ROLODEX</NavLink>
          </li>

          <li className={classes.navItem}>
            <NavLink to={"/helen-master"}>Helen's Master</NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to={"/stone-garden-master"}>SG Master</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
